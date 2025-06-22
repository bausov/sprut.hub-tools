// @ts-nocheck

declare var log: Log

declare enum HC {}

declare enum HS {}

declare var console: Log
declare var Hub: Hub
declare var Cron: Cron
declare var Notify: Notifier
declare var SSH: SSH
declare var Mail: Mail

declare var Utils: Utils
declare var UtilsNet: UtilsNet

declare var HttpClient: HttpClient

declare var GlobalVariables: {}
declare var LocalVariables: {}
declare var global: {}

declare function setInterval(
    handler: Function,
    timeout?: number,
    ...arguments: any[]
): Task

declare function setTimeout(
    handler: Function,
    timeout?: number,
    ...arguments: any[]
): Task

declare function clearInterval(task: Task)

declare function clearTimeout(task: Task)

declare function clear(task: Task)

interface Hub {
    /**
     * Returns accessory
     * @param id
     */
    getAccessory(id: number): Accessory

    /**
     * Returns all accessories
     */
    getAccessories(): Accessory[]

    /**
     * Returns the value of variable
     * @param aid
     * @param cid
     */
    getCharacteristicValue(aid: number, cid: number): any

    /**
     * Sets a value to characteristic
     * @param aid
     * @param cid
     * @param value
     */
    setCharacteristicValue(aid: number, cid: number, value: any)

    /**
     * Sets a value to characteristic
     * @param aid
     * @param cid
     */
    toggleCharacteristicValue(aid: number, cid: number)

    /**
     * Returns the value of characteristic
     * @param aid
     * @param cid
     */
    getCharacteristic(aid: number, cid: number): Characteristic

    /**
     * Returns all rooms
     */
    getRooms(): Room[]

    /**
     * info
     * @param handler
     * @param args
     */
    subscribe(handler: Function, ...args): Task

    /**
     * info
     * @param cond
     * @param value
     * @param hs
     * @param hc
     * @param handler
     * @param args
     */
    subscribeWithCondition(
        cond: string,
        value: string,
        [hs],
        [hc],
        handler: Function,
        ...args
    ): Task

    /**
     * info
     * @param uuid
     */
    //unsubscribe(uuid: string);
}

interface Accessory {
    /**
     * info
     */
    getServices(): Service[]

    /**
     * info
     * @param visible
     */
    getServices(visible: boolean): Service[]

    /**
     * info
     * @param visible
     * @param hs
     */
    getServices(visible: boolean, hs: HS): Service[]

    /**
     * info
     * @param id
     */
    getService(id: number): Service

    /**
     * info
     * @param hs
     */
    getService(hs: HS): Service

    /**
     * Returns the value of characteristic
     * @param id
     */
    getCharacteristic(id: number): Characteristic

    /**
     * info
     */
    getRoom(): Room

    /**
     * info
     */
    getUUID(): String

    /**
     * info
     */
    getName(): String

    /**
     * info
     * @param name
     */
    setName(name: string)

    /**
     * info
     */
    getModel(): String

    /**
     * info
     */
    getModelId(): String

    /**
     * info
     */
    getManufacturer(): String

    /**
     * info
     */
    getManufacturerId(): String

    /**
     * info
     */
    getSerial(): String

    /**
     * info
     */
    getFirmware(): String

    /**
     * info
     */
    getSnapshot(): number[]

    /**
     * info
     */
    getSnapshot(width: number, height: number): number[]
}

interface Service {
    /**
     * info
     */
    getAccessory(): Accessory

    /**
     * info
     * @param id
     */
    getCharacteristic(id: number): Characteristic

    /**
     * info
     * @param hc
     */
    getCharacteristic(hc: HC): Characteristic

    /**
     * info
     */
    getCharacteristics(): Characteristic[]

    /**
     * info
     */
    getType(): HS

    /**
     * info
     */
    isVisible(): boolean

    /**
     * info
     * @param visible
     */
    setVisible(visible: boolean)

    /**
     * info
     */
    getUUID(): String

    /**
     * info
     */
    getName(): String

    /**
     * info
     * @param name
     */
    setName(name: string)
}

interface Characteristic {
    /**
     * info
     */
    getAccessory(): Accessory

    /**
     * info
     */
    getService(): Service

    /**
     * info
     */
    getValue(): any

    /**
     * info
     * @param value
     */
    setValue(value: any)

    /**
     * info
     */
    toggle()

    /**
     * info
     */
    isStatusVisible(): boolean

    /**
     * info
     * @param statusVisible
     */
    setStatusVisible(statusVisible: boolean)

    /**
     * info
     */
    isNotify(): boolean

    /**
     * info
     * @param notify
     */
    setNotify(notify: boolean)

    /**
     * info
     */
    getType(): HC

    /**
     * info
     */
    getUUID(): String

    /**
     * format
     */
    format(): String

    /**
     * getMinValue
     */
    getMinValue(): number

    /**
     * getMaxValue
     */
    getMaxValue(): number

    /**
     * getMinStep
     */
    getMinStep(): number

    /**
     * info
     */
    getName(): String
}

interface Room {
    /**
     * info
     */
    getAccessories(): Accessory[]

    /**
     * info
     */
    getName(): String

    /**
     * info
     * @param name
     */
    setName(name: string)
}

interface HttpClient {
    /**
     * Returns accessory
     * @param url
     */
    GET(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    POST(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    PUT(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    HEAD(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    DELETE(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    OPTIONS(url: string): HttpRequest

    /**
     * Returns accessory
     * @param url
     */
    PATCH(url: string): HttpRequest
}

interface HttpRequest {
    /////////////////////////////////////////////////////
    ////////URL
    /////////////////////////////////////////////////////

    /**
     * Set header
     * @param url
     */
    setURL(url: String): HttpRequest

    /**
     * info
     * @param name
     * @param value
     */
    queryString(name: String, value: Object): HttpRequest

    /**
     * info
     * @param segment
     */
    path(segment: String): HttpRequest

    /**
     * info
     * @param info
     */
    userInfo(info: String): HttpRequest

    /**
     * info
     * @param num
     */
    port(num: number): HttpRequest

    /////////////////////////////////////////////////////
    ////////header
    /////////////////////////////////////////////////////

    /**
     * Set header
     * @param name
     * @param value
     */
    header(name: String, value: Object): HttpRequest

    /**
     * Set cookie
     * @param name
     * @param value
     */
    cookie(name: String, value: String): HttpRequest

    /**
     * Remove header key
     * @param name
     */
    reset(name: String): HttpRequest

    /////////////////////////////////////////////////////
    ////////method
    /////////////////////////////////////////////////////

    /**
     * info
     * @param method
     */
    method(method: String): HttpRequest

    /////////////////////////////////////////////////////
    ////////body
    /////////////////////////////////////////////////////

    /**
     * info
     * @param name
     * @param value
     */
    field(name: String, value: Object): HttpRequest

    /**
     * info
     * @param name
     * @param value
     */
    fieldMultipart(name: String, value: Object): HttpRequest

    /**
     * info
     * @param text
     */
    body(text: String): HttpRequest

    /**
     * info
     * @param body
     */
    body(body: []): HttpRequest

    /////////////////////////////////////////////////////
    ////////main
    /////////////////////////////////////////////////////

    /**
     * info
     * @param connectTimeout
     * @param readTimeout
     */
    timeout(connectTimeout: number, readTimeout: number): HttpRequest

    /**
     * info
     * @param connectTimeout
     */
    connectTimeout(connectTimeout: number): HttpRequest

    /**
     * info
     * @param readTimeout
     */
    readTimeout(readTimeout: number): HttpRequest

    /**
     * info
     * @param noCheckCertificate
     */
    noCheckCertificate(noCheckCertificate: boolean): HttpRequest

    /**
     * info
     */
    send(): HttpResponse
}

interface HttpResponse {
    /**
     * info
     */
    back(): HttpRequest

    /**
     * info
     */
    getStatus(): number

    /**
     * info
     */
    getStatusText(): String

    /**
     * info
     */
    getHeaders(): Record

    /**
     * info
     */
    getCookies(): Record

    /**
     * info
     */
    getBody(): String

    /**
     * info
     */
    getBinary(): []
}

interface Log {
    /**
     * info
     * @param format
     * @param arg
     */
    message(format: string, ...arg: any)

    /**
     * info
     * @param format
     * @param arg
     */
    info(format: string, ...arg: any)

    /**
     * info
     * @param format
     * @param arg
     */
    warn(format: string, ...arg: any)

    /**
     * info
     * @param format
     * @param arg
     */
    error(format: string, ...arg: any)
}

interface Task {
    /**
     * info
     */
    clear()
}

interface Cron {
    /**
     * info
     * @param schedule
     * @param handler
     * @param arguments
     */
    schedule(schedule: string, handler: Function, ...arguments: any[]): Task

    /**
     * info
     * @param schedule
     * @param offset
     * @param handler
     * @param arguments
     */
    sunrise(
        schedule: string,
        offset: number,
        handler: Function,
        ...arguments: any[]
    ): Task

    /**
     * info
     * @param schedule
     * @param offset
     * @param handler
     * @param arguments
     */
    sunset(
        schedule: string,
        offset: number,
        handler: Function,
        ...arguments: any[]
    ): Task
}

interface Utils {
    /**
     * info
     */
    uuid(): String
}

interface UtilsNet {
    /**
     * info
     * @param mac
     */
    wakeOnLan(mac: String)

    /**
     * info
     * @param host
     */
    getMacAddress(host: String)

    /**
     * info
     * @param host
     */
    ping(host: String): boolean
}

interface Mail {
    /**
     * info
     * @param host
     */
    host(host: String): Mail

    /**
     * info
     * @param port
     */
    port(port: number): Mail

    /**
     * info
     * @param username
     */
    username(username: String): Mail

    /**
     * info
     * @param from
     */
    from(from: String): Mail

    /**
     * info
     * @param password
     */
    password(password: String): Mail

    /**
     * info
     * @param to
     */
    to(to: String): Mail

    /**
     * info
     * @param subject
     */
    subject(subject: String): Mail

    /**
     * info
     * @param body
     */
    body(body: String): Mail

    /**
     * info
     */
    send()
}

interface SSH {
    /**
     * info
     * @param host
     */
    host(host: String): SSH

    /**
     * info
     * @param port
     */
    port(port: number): SSH

    /**
     * info
     * @param username
     */
    username(username: String): SSH

    /**
     * info
     * @param password
     */
    password(password: String): SSH

    /**
     * info
     */
    connect(): SSHSession
}

interface SSHSession {
    /**
     * info
     * @param command
     * @param timeout
     */
    execute(command: String, timeout?: number)

    /**
     * info
     * @param command
     * @param timeout
     */
    request(command: String, timeout?: number): String
}

interface Notifier {
    /**
     * info
     * @param text
     * @param arguments
     */
    text(text: String, ...arguments: any[]): Notify
}

interface Notify {
    /**
     * info
     * @param index
     * @param clients
     */
    to(index: String, ...clients: String[]): Notify

    /**
     * info
     * @param text
     */
    debugText(text: String): Notify

    /**
     * info
     */
    send()
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