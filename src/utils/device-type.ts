enum DeviceType {
    Mobile = 0,
    Tablet = 1,
    Desktop = 2,
}

export default function detectDeviceType() {
    const ua = navigator.userAgent;

    if (/mobile/i.test(ua)) {
        return DeviceType.Mobile;
    } else if (/iPad|Android|Touch/i.test(ua)) {
        return DeviceType.Tablet;
    }
    return DeviceType.Desktop;
}
