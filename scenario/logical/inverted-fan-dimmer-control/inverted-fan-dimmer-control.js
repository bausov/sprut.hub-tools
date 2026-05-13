let controlledDimmers = getServicesByServiceAndCharacteristicType0(
    [HS.Lightbulb],
    [HC.On, HC.Brightness]
);

info = {
    name: "Управление инвертированным диммером вытяжки",
    description: "Синхронизирует on/off и rotationSpeed",
    version: "1.0",
    author: "@bausov",
    onStart: false,
    sourceServices: [HS.Fan],
    sourceCharacteristics: [HC.Active, HC.RotationSpeed],

    options: {
        invertedDimmer: {
            name: {
                en: "Inverted Dimmer",
                ru: "Инвертированный Диммер"
            },
            type: "String",
            value: "",
            formType: "list",
            values: controlledDimmers
        },
    }
}

function trigger(source, value, variables, options, context) {
    const service = source.getService();
    const serviceName = service.getCharacteristic(HC.Name).getValue();
    const isActive = service.getCharacteristic(HC.Active).getValue();
    const rotationSpeed = service.getCharacteristic(HC.RotationSpeed).getValue();
    const invertedDimmer = getInvertedDimmer(options)

    invertedDimmer.getCharacteristic(HC.On).setValue(isActive)
    invertedDimmer.getCharacteristic(HC.Brightness).setValue(100 - rotationSpeed)

    console.info("Trigger " + serviceName + ": set invertedDimmer 0n: " + isActive + ", Brightness (inverted): " + (100 - rotationSpeed))
}

function getInvertedDimmer(options) {
    return getDevice0(options, "invertedDimmer")
}

// utils

/**
 * Функция подготовки списка характеристик для выбора в настройке логики
 * @param {Array} serviceTypes - Список типов сервисов
 * @param {Array} characteristicTypes - Список типов характеристик
 * @returns {Array} Список сервисов с характеристиками
 */
function getServicesByServiceAndCharacteristicType0(serviceTypes, characteristicTypes) {
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
                let displayname = getDeviceName0(s)
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

function getDevice0(options, name) {
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

function getDeviceName0(service) {
    const acc = service.getAccessory();
    const room = acc.getRoom().getName();
    const accName = acc.getName();
    const sName = service.getName();
    const uuid = service.getUUID();
    const visibility = service.isVisible() ? "" : " (Hidden)";

    return `${room} → ${accName === sName ? accName : accName + " " + sName} (${uuid})${visibility}`;
}