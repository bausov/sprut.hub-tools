let controlledLightbulbs = getServicesByServiceAndCharacteristicType(
    [HS.Lightbulb],
    [HC.On, HC.Brightness]
);

info = {
    name: "Управление светом для aqara h1",
    description: "Одинарное нажатие вкл 50% яркости, двойное 100%",
    version: "1.0",
    author: "@bausov",
    onStart: false,
    sourceServices: [HS.StatelessProgrammableSwitch],
    sourceCharacteristics: [HC.ProgrammableSwitchEvent, HC.ServiceLabelIndex],

    options: {
        lightbulb1: {
            name: {
                en: "Lightbulb 1",
                ru: "Лампочка 1"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledLightbulbs
        },
        lightbulb2: {
            name: {
                en: "Lightbulb 2",
                ru: "Лампочка 2"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledLightbulbs
        },
        lightbulb3: {
            name: {
                en: "Lightbulb 3",
                ru: "Лампочка 3"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledLightbulbs
        },
        lightbulb4: {
            name: {
                en: "Lightbulb 4",
                ru: "Лампочка 4"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledLightbulbs
        },
        lightbulb5: {
            name: {
                en: "Lightbulb 5",
                ru: "Лампочка 5"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledLightbulbs
        },
    }
}

function trigger(source, value, variables, options, context) {
    const service = source.getService();
    const serviceName = service.getCharacteristic(HC.Name).getValue();
    const programmableSwitchEventValue = service.getCharacteristic(HC.ProgrammableSwitchEvent).getValue();
    const linkedLightbulbs = getLinkedLightbulbs(options);

    switch (programmableSwitchEventValue) {
        case 0:
            console.info("Trigger: SINGLE_PRESS, service: " + service + ", name: " + serviceName)

            if (isAnyOn(linkedLightbulbs)) {
                setAllOn(linkedLightbulbs, false)
            } else {
                setAllOnAndBrightness(linkedLightbulbs, true, 50)
            }

            break;
        case 1:
            console.info("Trigger: DOUBLE_PRESS, service: " + service + ", name: " + serviceName)

            setAllOn(linkedLightbulbs, true)
            setAllOnAndBrightness(linkedLightbulbs, true, 100)

            break;
        case 2:
            console.info("Trigger: LONG_PRESS, service: " + service + ", name: " + serviceName + "\nNO ACTION")
            break;
        default:
            console.error("Trigger: UNSUPPORTED, service: " + service + ", name: " + serviceName)
    }
}

function getLinkedLightbulbs(options) {
    return [
        getDevice(options, "lightbulb1"),
        getDevice(options, "lightbulb2"),
        getDevice(options, "lightbulb3"),
        getDevice(options, "lightbulb4"),
        getDevice(options, "lightbulb5")
    ].filter(item => item !== undefined)
}

function isAnyOn(services) {
    return services.some(service => service.getCharacteristic(HC.On).getValue() === true)
}

function setAllOn(services, on) {
    services.forEach(service => {
        setOn(service, on)
    })
}

function setAllOnAndBrightness(services, on, brightness) {
    services.forEach(service => {
        setOn(service, on)
        setBrightness(service, brightness)
    })
}

function setOn(service, on) {
    if (service === undefined)
        return

    service.getCharacteristic(HC.On).setValue(on)
    console.info(service + ": On=" + on)
}

function setBrightness(service, brightness) {
    if (service === undefined)
        return

    service.getCharacteristic(HC.Brightness).setValue(brightness)
    console.info(service + ": Brightness=" + brightness)
}

// utils

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