declare var log: Log;

declare enum HC {}

declare enum HS {}

// @ts-ignore
/**
 * Интерфейс для работы с логами
 */
declare var console: Log;
/**
 * Главный интерфейс для работы с устройствами в Sprut.Hub
 */
declare var Hub: Hub;
/**
 * Планировщик событий Cron
 */
declare var Cron: Cron;
/**
 * Интерфейс для работы с уведомлениями
 */
declare var Notify: Notifier;
/**
 * Интерфейс для подключения к внешним устройствам по SSH
 */
declare var SSH: SSH;
/**
 * Интерфейс для отправки E-Mail сообщений
 */
declare var Mail: Mail;
/**
 * Интерфейс для выполнения HTTP запросов
 */
declare var HttpClient: HttpClient;

/**
 * Различные утилиты
 */

declare var Utils: Utils;
/**
 * Сетевые утилиты
 */
declare var UtilsNet: UtilsNet;


/**
 * Глобальные переменные. Хранятся в памяти. Очищаются при перезагрузке
 */
declare var GlobalVariables: {};
/**
 * Локальные переменные. Хранятся внутри сценария, очищаются при сохранении изменений в сценарии и при перезагрузке хаба.
 */
declare var LocalVariables: {};
/**
 * Алиас для GlobalVariables
 */
declare var global: {};


/**
 * Устанавливает повторяющийся таймер с указанным обработчиком и интервалом
 * @param handler Функция-обработчик, вызываемая по интервалу
 * @param timeout Интервал времени в миллисекундах
 * @param arguments Дополнительные аргументы для обработчика
 * @returns Задача (Task), связанная с этим таймером
 */
declare function setInterval(handler: Function, timeout?: number, ...arguments: any[]): Task;

/**
 * Устанавливает таймер с единовременным вызовом обработчика после задержки
 * @param handler Функция-обработчик, вызываемая после задержки
 * @param timeout Задержка в миллисекундах
 * @param arguments Дополнительные аргументы для обработчика
 * @returns Задача (Task), связанная с этим таймером
 */
declare function setTimeout(handler: Function, timeout?: number, ...arguments: any[]): Task;

/**
 * Останавливает повторяющийся таймер, заданный с помощью setInterval
 * @param task Задача (Task), связанная с таймером, которая возвращается при вызове setInterval
 */
declare function clearInterval(task: Task);

/**
 * Останавливает таймер, заданный с помощью setTimeout
 * @param task Задача (Task), связанная с таймером, которая возвращается при вызове setTimeout
 */
declare function clearTimeout(task: Task);

/**
 * Очищает задачу (Task), связанную с таймером или другим процессом
 * @param task Задача (Task) для очистки
 */
declare function clear(task: Task);


/**
 * Главный интерфейс Sprut.Hub для доступа и управление устройствами
 */
interface Hub {
    /**
     * Возвращает аксессуар
     * @param id Идентификатор аксессуара
     */
    getAccessory(id: number): Accessory;

    /**
     * Возвращает все аксессуары
     */
    getAccessories(): Accessory[];

    /**
     * Возвращает значение характеристики
     * @param aid Идентификатор аксессуара
     * @param cid Идентификатор характеристики
     */
    getCharacteristicValue(aid: number, cid: number): any;

    /**
     * Устанавливает новое значение конкретной характеристики
     * @param aid Идентификатор аксессуара
     * @param cid Идентификатор характеристики
     * @param value Значение для установки
     */
    setCharacteristicValue(aid: number, cid: number, value: any);

    /**
     * Переключает значение характеристики (только для boolean характеристик, например HC.On)
     * @param aid Идентификатор аксессуара
     * @param cid Идентификатор характеристики
     */
    toggleCharacteristicValue(aid: number, cid: number);

    /**
     * Возвращает характеристику
     * @param aid Идентификатор аксессуара
     * @param cid Идентификатор характеристики
     */
    getCharacteristic(aid: number, cid: number): Characteristic;

    /**
     * Возвращает все комнаты
     */
    getRooms(): Room[];

    /**
     * Подписка на обновления изменения характеристики
     * @param handler Обработчик события
     * @param args Дополнительные аргументы
     */
    subscribe(handler: Function, ...args): Task;

    /**
     * Подписка на обновления изменения характеристики с условием
     * @param cond Условие
     * @param value Значение
     * @param hs Массив сервисов, на которые нужна подписка
     * @param hc Массив характеристик, на которые нужна подписка
     * @param handler Обработчик события
     * @param args Дополнительные аргументы
     */
    subscribeWithCondition(cond: string, value: string, [hs], [hc], handler: Function, ...args): Task;
}

/**
 * Аксессуар - это конкретное устройство
 */
interface Accessory {
    /**
     * Возвращает список сервисов у аксессуара
     */
    getServices(): Service[];

    /**
     * Возвращает список сервисов с фильтром по видимости
     * @param visible Видимость сервисов. true - видимые, false - скрытые
     */
    getServices(visible: boolean): Service[];

    /**
     * Возвращает список сервисов с фильтром по видимости и типу
     * @param visible Видимость сервисов. true - видимые, false - скрытые
     * @param hs Тип сервиса
     */
    getServices(visible: boolean, hs: HS): Service[];

    /**
     * Возвращает сервис по идентификатору
     * @param id Идентификатор сервиса
     */
    getService(id: number): Service;

    /**
     * Возвращает сервис по типу
     * @param hs Тип сервиса (HS)
     */
    getService(hs: HS): Service;

    /**
     * Возвращает характеристику по идентификатору
     * @param id Идентификатор характеристики
     */
    getCharacteristic(id: number): Characteristic;

    /**
     * Возвращает комнату аксессуара
     */
    getRoom(): Room;

    /**
     * Возвращает идентификатор (ID) аксессуара
     */
    getUUID(): String;

    /**
     * Возвращает имя аксессуара
     */
    getName(): String;

    /**
     * Устанавливает имя аксессуара
     * @param name Новое имя аксессуара
     */
    setName(name: string);

    /**
     * Возвращает модель аксессуара
     */
    getModel(): String;

    /**
     * Возвращает идентификатор модели аксессуара
     */
    getModelId(): String;

    /**
     * Возвращает производителя аксессуара
     */
    getManufacturer(): String;

    /**
     * Возвращает идентификатор производителя аксессуара
     */
    getManufacturerId(): String;

    /**
     * Возвращает серийный номер аксессуара
     */
    getSerial(): String;

    /**
     * Возвращает версию прошивки аксессуара
     */
    getFirmware(): String;

    /**
     * Возвращает скриншот. Поддерживаются только устройство с видеопотоком (камеры)
     */
    getSnapshot(): number[];

    /**
     * Возвращает скриншот с указанными размерами. Поддерживаются только устройство с видеопотоком (камеры)
     * @param width Ширина снимка
     * @param height Высота снимка
     */
    getSnapshot(width: number, height: number): number[];
}

/**
 * Сервис. В каждом аксессуаре может быть один или несколько сервисов
 */
interface Service {
    /**
     * Возвращает аксессуар
     */
    getAccessory(): Accessory;

    /**
     * Возвращает характеристику по идентификатору
     * @param id Идентификатор характеристики
     */
    getCharacteristic(id: number): Characteristic;

    /**
     * Возвращает характеристику по типу
     * @param hc Тип характеристики (HC)
     */
    getCharacteristic(hc: HC): Characteristic;

    /**
     * Возвращает все досутпные характеристики сервиса
     */
    getCharacteristics(): Characteristic[];

    /**
     * Возвращает тип сервиса
     */
    getType(): HS;

    /**
     * Проверяет, видим ли сервис
     */
    isVisible(): boolean;

    /**
     * Устанавливает видимость сервиса
     * @param visible Видимость. true - видим, false - не видим
     */
    setVisible(visible: boolean);

    /**
     * Возвращает идентификатор (ID) сервиса
     */
    getUUID(): String;

    /**
     * Возвращает имя сервиса
     */
    getName(): String;

    /**
     * Устанавливает имя сервиса
     * @param name Новое имя сервиса
     */
    setName(name: string);
}

/**
 * Характеристика. В каждом сервисе может быть одна или несколько характеристик, часть из которых обязательные
 */
interface Characteristic {
    /**
     * Возвращает аксессуар, связанный с характеристикой
     */
    getAccessory(): Accessory;

    /**
     * Возвращает сервис, связанный с характеристикой
     */
    getService(): Service;

    /**
     * Возвращает значение характеристики с типом, характерным для данной характеристики
     */
    getValue(): any;

    /**
     * Устанавливает значение для характеристики
     * @param value Новое значение характеристики
     */
    setValue(value: any);

    /**
     * Переключает значение характеристики (только для boolean характеристик, например HC.On)
     */
    toggle();

    /**
     * Проверяет, отображается ли статус характеристики (в панели статусов в комнате)
     */
    isStatusVisible(): boolean;

    /**
     * Устанавливает видимость статуса характеристики
     * @param statusVisible Видимость статуса
     */
    setStatusVisible(statusVisible: boolean);

    /**
     * Проверяет, включено ли уведомление о изменении значения характеристики
     */
    isNotify(): boolean;

    /**
     * Устанавливает уведомление о изменении значения характеристики
     * @param notify Включение (true) или отключение (false) уведомлений
     */
    setNotify(notify: boolean);

    /**
     * Возвращает тип характеристики
     */
    getType(): HC;

    /**
     * Возвращает идентификатор (ID) характеристики
     */
    getUUID(): String;

    /**
     * Форматирует характеристику в строку
     */
    format(): String;

    /**
     * Возвращает минимальное значение характеристики
     */
    getMinValue(): number;

    /**
     * Возвращает максимальное значение характеристики
     */
    getMaxValue(): number;

    /**
     * Возвращает минимальный шаг изменения значения характеристики
     */
    getMinStep(): number;

    /**
     * Возвращает имя характеристики
     */
    getName(): String;
}

/**
 * Комната
 */
interface Room {
    /**
     * Возвращает список аксессуаров в комнате
     */
    getAccessories(): Accessory[];

    /**
     * Возвращает имя комнаты
     */
    getName(): String;

    /**
     * Устанавливает имя комнаты
     * @param name Новое имя комнаты
     */
    setName(name: string);
}

/**
 * Интерфейс для отправки сетевых запросов
 */
interface HttpClient {
    /**
     * Выполняет GET-запрос
     * @param url URL для запроса
     */
    GET(url: string): HttpRequest;

    /**
     * Выполняет POST-запрос
     * @param url URL для запроса
     */
    POST(url: string): HttpRequest;

    /**
     * Выполняет PUT-запрос
     * @param url URL для запроса
     */
    PUT(url: string): HttpRequest;

    /**
     * Выполняет HEAD-запрос
     * @param url URL для запроса
     */
    HEAD(url: string): HttpRequest;

    /**
     * Выполняет DELETE-запрос
     * @param url URL для запроса
     */
    DELETE(url: string): HttpRequest;

    /**
     * Выполняет OPTIONS-запрос
     * @param url URL для запроса
     */
    OPTIONS(url: string): HttpRequest;

    /**
     * Выполняет PATCH-запрос
     * @param url URL для запроса
     */
    PATCH(url: string): HttpRequest;
}

/**
 * Сетевой запрос
 */
interface HttpRequest {

    /////////////////////////////////////////////////////
    ////////URL
    /////////////////////////////////////////////////////

    /**
     * Устанавливает URL для запроса
     * @param url URL-адрес
     */
    setURL(url: String): HttpRequest;

    /**
     * Добавляет параметр строки запроса
     * @param name Имя параметра
     * @param value Значение параметра
     */
    queryString(name: String, value: Object): HttpRequest;

    /**
     * Добавляет сегмент пути в URL
     * @param segment Сегмент пути
     */
    path(segment: String): HttpRequest;

    /**
     * Добавляет информацию о пользователе в запрос
     * @param info Информация о пользователе
     */
    userInfo(info: String): HttpRequest;

    /**
     * Устанавливает порт для запроса
     * @param num Номер порта
     */
    port(num: number): HttpRequest;

    /////////////////////////////////////////////////////
    ////////header
    /////////////////////////////////////////////////////

    /**
     * Устанавливает заголовок запроса (может быть несколько)
     * @param name Имя заголовка
     * @param value Значение заголовка
     */
    header(name: String, value: Object): HttpRequest;

    /**
     * Устанавливает cookie для запроса
     * @param name Имя cookie
     * @param value Значение cookie
     */
    cookie(name: String, value: String): HttpRequest;

    /**
     * Удаляет указанный заголовок из запроса
     * @param name Имя заголовка
     */
    reset(name: String): HttpRequest;

    /////////////////////////////////////////////////////
    ////////method
    /////////////////////////////////////////////////////

    /**
     * Устанавливает метод запроса
     * @param method Метод HTTP (GET, POST и т.д.)
     */
    method(method: String): HttpRequest;

    /////////////////////////////////////////////////////
    ////////body
    /////////////////////////////////////////////////////

    /**
     * Устанавливает значение поля для формы
     * @param name название поля
     * @param value значение
     */
    field(name: String, value: Object): HttpRequest;


    /**
     * Поля Multipart запроса
     * @param name название поля
     * @param value значение
     */
    fieldMultipart(name: String, value: Object): HttpRequest;


    /**
     * Добавляет текстовое тело к запросу
     * @param text Текст для отправки в теле
     */
    body(text: String): HttpRequest;

    /**
     * Добавляет массив в качестве тела запроса
     * @param body Массив данных
     */
    body(body: []): HttpRequest;

    /////////////////////////////////////////////////////
    ////////main
    /////////////////////////////////////////////////////

    /**
     * Устанавливает таймаут для соединения и чтения
     * @param connectTimeout Таймаут подключения
     * @param readTimeout Таймаут чтения
     */
    timeout(connectTimeout: number, readTimeout: number): HttpRequest;

    /**
     * Устанавливает таймаут подключения
     * @param connectTimeout Таймаут подключения
     */
    connectTimeout(connectTimeout: number): HttpRequest;

    /**
     * Устанавливает таймаут чтения
     * @param readTimeout Таймаут чтения
     */
    readTimeout(readTimeout: number): HttpRequest;

    /**
     * Отключает проверку сертификата
     * @param noCheckCertificate Флаг отключения проверки
     */
    noCheckCertificate(noCheckCertificate: boolean): HttpRequest;

    /**
     * Отправляет запрос
     */
    send(): HttpResponse;
}

/**
 * Ответ сетевого запроса
 */
interface HttpResponse {
    /**
     * Возвращает предыдущий запрос
     */
    back(): HttpRequest;

    /**
     * Возвращает статус ответа
     */
    getStatus(): number;

    /**
     * Возвращает текст статуса ответа
     */
    getStatusText(): String;

    /**
     * Возвращает заголовки ответа
     */
    getHeaders(): Record;

    /**
     * Возвращает cookies из ответа
     */
    getCookies(): Record;

    /**
     * Возвращает тело ответа в виде строки
     */
    getBody(): String;

    /**
     * Возвращает бинарные данные ответа
     */
    getBinary(): [];
}

/**
 * Интерфейс вывода логов, вызывать для инстанса console
 */
interface Log {
    /**
     * Логирует сообщение
     * @param format Формат сообщения
     * @param arg Аргументы для форматирования
     */
    message(format: string, ...arg: any);

    /**
     * Логирует информационное сообщение
     * @param format Формат сообщения
     * @param arg Аргументы для форматирования
     */
    info(format: string, ...arg: any);

    /**
     * Логирует предупреждение
     * @param format Формат сообщения
     * @param arg Аргументы для форматирования
     */
    warn(format: string, ...arg: any);

    /**
     * Логирует ошибку
     * @param format Формат сообщения
     * @param arg Аргументы для форматирования
     */
    error(format: string, ...arg: any);
}

/**
 * Задача
 */
interface Task {

    /**
     * Останавливает и очищает задачу
     */
    clear();
}

/**
 * Запуск задач по расписанию
 */
interface Cron {
    /**
     * Запускает задачу по расписанию
     * @param schedule Расписание в формате Cron
     * @param handler Функция-обработчик
     * @param arguments Дополнительные аргументы
     * @returns Задача (Task), связанная с расписанием
     */
    schedule(schedule: string, handler: Function, ...arguments: any[]): Task;

    /**
     * Запускает задачу на рассвете
     * @param schedule Расписание в формате Cron
     * @param offset Смещение времени в минутах
     * @param handler Функция-обработчик
     * @param arguments Дополнительные аргументы
     * @returns Задача (Task), связанная с расписанием
     */
    sunrise(schedule: string, offset: number, handler: Function, ...arguments: any[]): Task;

    /**
     * Запускает задачу на закате
     * @param schedule Расписание в формате Cron
     * @param offset Смещение времени в минутах
     * @param handler Функция-обработчик
     * @param arguments Дополнительные аргументы
     * @returns Задача (Task), связанная с расписанием
     */
    sunset(schedule: string, offset: number, handler: Function, ...arguments: any[]): Task;
}

/**
 * Утилиты
 */
interface Utils {

    /**
     * Генерирует UUID
     * @returns Строка с уникальным идентификатором
     */
    uuid(): String;

}

/**
 * Сетевые утилиты
 */
interface UtilsNet {

    /**
     * Отправляет Wake-on-LAN сигнал для включения устройства
     * @param mac MAC-адрес устройства
     */
    wakeOnLan(mac: String);

    /**
     * Возвращает MAC-адрес устройства по имени хоста
     * @param host Имя хоста или IP-адрес устройства
     * @returns MAC-адрес устройства
     */
    getMacAddress(host: String);

    /**
     * Проверяет доступность устройства через пинг
     * @param host Имя хоста или IP-адрес устройства
     * @returns true, если устройство доступно; иначе false
     */
    ping(host: String): boolean;

}

/**
 * Почтовый клиент для отправки E-Mail сообщений
 */
interface Mail {

    /**
     * Устанавливает хост почтового сервера
     * @param host Адрес почтового сервера
     * @returns Текущий объект Mail
     */
    host(host: String): Mail;

    /**
     * Устанавливает порт почтового сервера
     * @param port Номер порта
     * @returns Текущий объект Mail
     */
    port(port: number): Mail;

    /**
     * Устанавливает имя пользователя для авторизации
     * @param username Имя пользователя
     * @returns Текущий объект Mail
     */
    username(username: String): Mail;

    /**
     * Устанавливает отправителя письма
     * @param from Адрес отправителя
     * @returns Текущий объект Mail
     */
    from(from: String): Mail;

    /**
     * Устанавливает пароль для авторизации
     * @param password Пароль пользователя
     * @returns Текущий объект Mail
     */
    password(password: String): Mail;

    /**
     * Добавляет получателя письма
     * @param to Адрес получателя
     * @returns Текущий объект Mail
     */
    to(to: String): Mail;

    /**
     * Устанавливает тему письма
     * @param subject Тема письма
     * @returns Текущий объект Mail
     */
    subject(subject: String): Mail;

    /**
     * Устанавливает тело письма
     * @param body Текст тела письма
     * @returns Текущий объект Mail
     */
    body(body: String): Mail;

    /**
     * Отправляет письмо
     */
    send();
}

/**
 * Интерфейс для подключения к внешним устройствам по SSH
 */
interface SSH {

    /**
     * Устанавливает хост для подключения
     * @param host Адрес сервера
     * @returns Текущий объект SSH
     */
    host(host: String): SSH;

    /**
     * Устанавливает порт для подключения
     * @param port Номер порта
     * @returns Текущий объект SSH
     */
    port(port: number): SSH;

    /**
     * Устанавливает имя пользователя для подключения
     * @param username Имя пользователя
     * @returns Текущий объект SSH
     */
    username(username: String): SSH;

    /**
     * Устанавливает пароль для подключения
     * @param password Пароль пользователя
     * @returns Текущий объект SSH
     */
    password(password: String): SSH;

    /**
     * Устанавливает соединение
     * @returns Объект SSHSession
     */
    connect(): SSHSession;
}

/**
 * Сессия SSH подключения для выполнения команд
 */
interface SSHSession {
    /**
     * Выполняет команду на удалённом сервере
     * @param command Команда для выполнения
     * @param timeout Максимальное время ожидания выполнения (в миллисекундах)
     */
    execute(command: String, timeout?: number);

    /**
     * Выполняет команду на удалённом сервере и возвращает результат
     * @param command Команда для выполнения
     * @param timeout Максимальное время ожидания выполнения (в миллисекундах)
     * @returns Результат выполнения команды в виде строки
     */
    request(command: String, timeout?: number): String;
}

/**
 * Интерфейс уведомлений
 */
interface Notifier {
    /**
     * Создаёт текстовое уведомление
     * @param text Текст уведомления
     * @param arguments Дополнительные параметры
     * @returns Объект Notify
     */
    text(text: String, ...arguments: any[]): Notify;
}

/**
 * Интерфейс для работы с уведомлениями
 */
interface Notify {
    /**
     * Устанавливает адресатов уведомления
     * @param index Индекс адресата
     * @param clients Список клиентов для уведомления
     * @returns Текущий объект Notify
     */
    to(index: String, ...clients: String[]): Notify;

    /**
     * Устанавливает текст уведомления для отладки
     * @param text Текст уведомления
     * @returns Текущий объект Notify
     */
    debugText(text: String): Notify;

    /**
     * Отправляет уведомление
     */
    send();
}


enum HS {
    AccessControl,
    AccessoryInformation,
    AirPurifier,
    AirQualitySensor,
    AudioStreamManagement,
    BatteryService,
    C_AccessoryExtInfo,
    C_AmpereMeter,
    C_AmperePeakMeter,
    C_AngleMeter,
    C_AtmosphericPressureSensor,
    C_DistanceSensor,
    C_FrequencyMeter,
    C_GasMeter,
    C_GasSensor,
    C_HeatMeter,
    C_KiloVoltAmpereHourMeter,
    C_KiloVoltAmpereReactiveHourMeter,
    C_KiloWattHourMeter,
    C_Massage,
    C_NoiseSensor,
    C_Option,
    C_PetFeeder,
    C_PhaseAngleMeter,
    C_PowerFactorMeter,
    C_PulseMeter,
    C_Repeater,
    C_TemperatureControl,
    C_TiltAngle,
    C_Transceiver,
    C_UltravioletSensor,
    C_VoltAmpereMeter,
    C_VoltAmpereReactiveMeter,
    C_VoltAngleMeter,
    C_VoltMeter,
    C_VoltPeakMeter,
    C_WaterMeter,
    C_WattMeter,
    CameraControl,
    CameraOperatingMode,
    CameraRTPStreamManagement,
    CameraRecordingManagement,
    CarbonDioxideSensor,
    CarbonMonoxideSensor,
    CloudRelay,
    ContactSensor,
    DataStreamTransportManagement,
    Diagnostics,
    Door,
    Doorbell,
    Fan,
    FanBasic,
    Faucet,
    FilterMaintenance,
    GarageDoorOpener,
    GenericService,
    HAPProtocolInformation,
    HeaterCooler,
    HumidifierDehumidifier,
    HumiditySensor,
    InputSource,
    IrrigationSystem,
    LeakSensor,
    LightSensor,
    Lightbulb,
    LockManagement,
    LockMechanism,
    Microphone,
    MotionSensor,
    OccupancySensor,
    Outlet,
    PowerManagement,
    SecuritySystem,
    ServiceLabel,
    Siri,
    Slat,
    SmokeSensor,
    Speaker,
    StatelessProgrammableSwitch,
    Switch,
    TargetControl,
    TargetControlManagement,
    Television,
    TelevisionSpeaker,
    TemperatureSensor,
    Thermostat,
    ThreadTransport,
    TransferTransportManagement,
    Valve,
    WiFiRouter,
    WiFiSatellite,
    WiFiTransport,
    Window,
    WindowCovering
}

enum HC {
    AccessControlLevel,
    AccessoryFlags,
    Active,
    ActiveIdentifier,
    AdministratorOnlyAccess,
    AirQuality,
    AppMatchingIdentifier,
    AudioFeedback,
    BatteryLevel,
    Brightness,
    ButtonEvent,
    CCAEnergyDetectThreshold,
    CCASignalDetectThreshold,
    C_AQIDensity,
    C_Ampere,
    C_Angle,
    C_Boolean,
    C_CatalogId,
    C_CubicMeter,
    C_CurrentAtmosphericPressure,
    C_CurrentMotionLevel,
    C_CurrentNoiseLevel,
    C_CurrentUltraviolet,
    C_DecibelMilliWatts,
    C_Distance,
    C_Double,
    C_FanSpeed,
    C_FormaldehydeDensity,
    C_Frequency,
    C_GasDetected,
    C_GasType,
    C_GigaCalorie,
    C_Integer,
    C_Intensity,
    C_KiloVoltAmpereHour,
    C_KiloVoltAmpereReactiveHour,
    C_KiloWattHour,
    C_Long,
    C_LowExplosionLevel,
    C_NoiseDetected,
    C_Online,
    C_PM1_0Density,
    C_PowerFactor,
    C_PulseCount,
    C_Receive,
    C_Room,
    C_Scan,
    C_String,
    C_TargetPositionState,
    C_Transmit,
    C_Volt,
    C_VoltAmpere,
    C_VoltAmpereReactive,
    C_Watt,
    CameraOperatingModeIndicator,
    CarbonDioxideDetected,
    CarbonDioxideLevel,
    CarbonDioxidePeakLevel,
    CarbonMonoxideDetected,
    CarbonMonoxideLevel,
    CarbonMonoxidePeakLevel,
    CharacteristicValueActiveTransitionCount,
    CharacteristicValueTransitionControl,
    ChargingState,
    ClosedCaptions,
    ColorTemperature,
    ConfiguredName,
    ContactSensorState,
    CoolingThresholdTemperature,
    CurrentAirPurifierState,
    CurrentAmbientLightLevel,
    CurrentDoorState,
    CurrentFanState,
    CurrentHeaterCoolerState,
    CurrentHeatingCoolingState,
    CurrentHorizontalTiltAngle,
    CurrentHumidifierDehumidifierState,
    CurrentMediaState,
    CurrentPosition,
    CurrentRelativeHumidity,
    CurrentSlatState,
    CurrentTemperature,
    CurrentTiltAngle,
    CurrentTransport,
    CurrentVerticalTiltAngle,
    CurrentVisibilityState,
    DiagonalFieldOfView,
    DigitalZoom,
    DisplayOrder,
    EventRetransmissionMaximum,
    EventSnapshotsActive,
    EventTransmissionCounters,
    FilterChangeIndication,
    FilterLifeLevel,
    FirmwareRevision,
    GenericBase64Tlv8,
    GenericBoolean,
    GenericDouble,
    GenericInteger,
    GenericString,
    HardwareRevision,
    HeatingThresholdTemperature,
    HoldPosition,
    HomeKitCameraActive,
    Hue,
    Identifier,
    Identify,
    ImageMirroring,
    ImageRotation,
    InUse,
    InputDeviceType,
    InputSourceType,
    IsConfigured,
    LeakDetected,
    LockControlPoint,
    LockCurrentState,
    LockLastKnownAction,
    LockManagementAutoSecurityTimeout,
    LockPhysicalControls,
    LockTargetState,
    Logs,
    MACRetransmissionMaximum,
    MACTransmissionCounters,
    ManagedNetworkEnable,
    ManuallyDisabled,
    Manufacturer,
    MaximumTransmitPower,
    Model,
    MotionDetected,
    Mute,
    Name,
    NetworkAccessViolationControl,
    NetworkClientProfileControl,
    NetworkClientStatusControl,
    NightVision,
    NitrogenDioxideDensity,
    ObstructionDetected,
    OccupancyDetected,
    On,
    OperatingStateResponse,
    OpticalZoom,
    OutletInUse,
    OzoneDensity,
    PM10Density,
    PM2_5Density,
    PasswordSetting,
    PeriodicSnapshotsActive,
    PictureMode,
    PositionState,
    PowerModeSelection,
    ProductData,
    ProgramMode,
    ProgrammableSwitchEvent,
    ReceivedSignalStrengthIndication,
    ReceiverSensitivity,
    RecordingAudioActive,
    RelativeHumidityDehumidifierThreshold,
    RelativeHumidityHumidifierThreshold,
    RelayControlPoint,
    RelayEnabled,
    RelayState,
    RemainingDuration,
    RemoteKey,
    ResetFilterIndication,
    RotationDirection,
    RotationSpeed,
    RouterStatus,
    Saturation,
    SecuritySystemAlarmType,
    SecuritySystemCurrentState,
    SecuritySystemTargetState,
    SelectedAudioStreamConfiguration,
    SelectedCameraRecordingConfiguration,
    SelectedRTPStreamConfiguration,
    SerialNumber,
    ServiceLabelIndex,
    ServiceLabelNamespace,
    SetDuration,
    SetupDataStreamTransport,
    SetupEndpoints,
    SetupTransferTransport,
    SignalToNoiseRatio,
    SiriInputType,
    SlatType,
    SleepDiscoveryMode,
    SmokeDetected,
    SoftwareRevision,
    StatusActive,
    StatusFault,
    StatusLowBattery,
    StatusTampered,
    StreamingStatus,
    SulphurDioxideDensity,
    SupportedAudioRecordingConfiguration,
    SupportedAudioStreamConfiguration,
    SupportedCameraRecordingConfiguration,
    SupportedCharacteristicValueTransitionConfiguration,
    SupportedDataStreamTransportConfiguration,
    SupportedDiagnosticsSnapshot,
    SupportedRTPConfiguration,
    SupportedRouterConfiguration,
    SupportedTransferTransportConfiguration,
    SupportedVideoRecordingConfiguration,
    SupportedVideoStreamConfiguration,
    SwingMode,
    TargetAirPurifierState,
    TargetControlList,
    TargetControlSupportedConfiguration,
    TargetDoorState,
    TargetFanState,
    TargetHeaterCoolerState,
    TargetHeatingCoolingState,
    TargetHorizontalTiltAngle,
    TargetHumidifierDehumidifierState,
    TargetMediaState,
    TargetPosition,
    TargetRelativeHumidity,
    TargetTemperature,
    TargetTiltAngle,
    TargetVerticalTiltAngle,
    TargetVisibilityState,
    TemperatureDisplayUnits,
    ThirdPartyCameraActive,
    ThreadControlPoint,
    ThreadNodeCapabilities,
    ThreadOpenThreadVersion,
    ThreadStatus,
    TransmitPower,
    VOCDensity,
    ValveType,
    Version,
    Volume,
    VolumeControlType,
    VolumeSelector,
    WANConfigurationList,
    WANStatusList,
    WakeConfiguration,
    WaterLevel,
    WiFiCapabilities,
    WiFiConfigurationControl,
    WiFiSatelliteStatus
}