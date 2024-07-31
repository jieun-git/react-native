export const RouteNames = {
    HOME: 'home' as const,
    HOME_TAB: 'home-tab' as const,
    SHOPPING: 'shopping' as const,
    BROWSER: 'browser' as const,
}
// as const: unique 한 타입을 의미함

export type RootStackParamList = {
    [RouteNames.HOME_TAB]: undefined
    [RouteNames.BROWSER]: { initialUrl: string }
}
