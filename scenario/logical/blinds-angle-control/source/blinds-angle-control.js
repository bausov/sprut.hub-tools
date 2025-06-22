let controlledBlindsList = getServicesByServiceAndCharacteristicType([HS.WindowCovering], [HC.TargetPosition]);

info = {
    name: "Управление наклоном жалюзи",
    description: "Управление наклоном жалюзи",
    version: "1.0",
    author: "@bausov",
    onStart: false,
    sourceServices: [HS.WindowCovering],
    sourceCharacteristics: [HC.TargetPosition],

    options: {
        step: {
            name: {
                en: "Step value in %%",
                ru: "Величина шага в %%"
            },
            type: "Integer",
            value: 1
        },
        defaultPosition: {
            name: {
                en: "Default Position",
                ru: "Позиция по умолчанию"
            },
            type: "Integer",
            value: 50
        },
        blinds1: {
            name: {
                en: "Controlled Blinds 1",
                ru: "Управляемые жалюзи 1"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledBlindsList
        },
        blinds2: {
            name: {
                en: "Controlled Blinds 2",
                ru: "Управляемые жалюзи 2"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledBlindsList
        },
        blinds3: {
            name: {
                en: "Controlled Blinds 3",
                ru: "Управляемые жалюзи 3"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledBlindsList
        },
    }
}

function trigger(source, value, variables, options, context) {
    const service = source.getService();
    const targetPosition = service.getCharacteristic(HC.TargetPosition);
    const currentPosition = service.getCharacteristic(HC.CurrentPosition);

    if (!targetPosition) {
        log.info("Device {} does not support TargetPosition characteristic", source.getAccessory());
        return;
    }

    const current = targetPosition.getValue();
    const targetDefault = options.defaultPosition;
    const step = options.step;

    console.info(`[TRIGGER] Source: ${source}, Current TargetPosition: ${current}`);

    const direction = current > targetDefault ? -step : current < targetDefault ? step : 0;

    if (direction !== 0) {
        doStep(getDevice(options, "blinds1"), direction);
        doStep(getDevice(options, "blinds2"), direction);
        doStep(getDevice(options, "blinds3"), direction);

        // Reset position after a short delay
        setTimeout(() => {
            targetPosition.setValue(targetDefault);
            currentPosition.setValue(targetDefault);
            console.info(`[RESET] Source ${source} set to default position: ${targetDefault}`);
        }, 100);
    }
}

function doStep(service, step) {
    if (!service) return;

    const target = service.getCharacteristic(HC.TargetPosition);

    if (!target) {
        console.warn(`[STEP] TargetPosition characteristic not found for service: ${service}`);
        return;
    }

    const current = target.getValue();
    const next = current + step;

    if (next >= 0 && next <= 100) {
        target.setValue(next);
        console.info(`[STEP] TargetPosition updated: ${current} → ${next}`);
    } else {
        console.info(`[STEP] TargetPosition out of bounds: ${next} (ignored)`);
    }
}

/**
 * Функция подготовки списка характеристик для выбора в настройке логики
 * @param {Array} serviceTypes - Список типов сервисов
 * @param {Array} characteristicTypes - Список типов характеристик
 * @returns {Array} Список сервисов с характеристиками
 */
function getServicesByServiceAndCharacteristicType(serviceTypes, characteristicTypes) {
    let sortedServicesList = []
    let unsortedServicesList = []
    Hub.getAccessories().forEach((a) => {
        a.getServices().filter((s) => serviceTypes.indexOf(s.getType()) >= 0).forEach((s) => {
            let characteristic = undefined
            characteristicTypes.forEach(c => {
                if (!characteristic) {
                    let chr = s.getCharacteristic(c);
                    if (chr) characteristic = chr
                }
            })
            if (characteristic) {
                let displayname = getDeviceName(s)
                unsortedServicesList.push({
                    name: {ru: displayname, en: displayname},
                    value: s.getUUID()
                });
            }
        })
    });
    sortedServicesList.push({name: {ru: "Не выбрано", en: "Not selected"}, value: ''})
    unsortedServicesList.sort((a, b) => a.name.ru.localeCompare(b.name.ru)).forEach((s) => sortedServicesList.push(s))
    return sortedServicesList
}

function getDevice(options, name) {
    if (!options[name]) return undefined;

    const cdata = options[name].split('.');
    const aid = cdata[0];
    const sid = cdata[1];
    const service = Hub.getAccessory(aid).getService(sid);

    if (!service) {
        console.error(`[ERROR] Selected device not found: ${options[name]}`);
        return undefined;
    }

    return service;
}

function getDeviceName(service) {
    const acc = service.getAccessory();
    const room = acc.getRoom().getName();
    const accName = acc.getName();
    const sName = service.getName();
    const uuid = service.getUUID();
    const visibility = service.isVisible() ? "" : " (Hidden)";

    return `${room} → ${accName === sName ? accName : accName + " " + sName} (${uuid})${visibility}`;
}