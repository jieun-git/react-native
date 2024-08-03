/* Provider 로 감싼 자식들에게 데이터를 전역으로 공유(Props xx) */

import React, { MutableRefObject, useRef, useCallback } from 'react'
import WebView from 'react-native-webview'

interface WebViewContextType {
    webViewRefs: MutableRefObject<WebView[]>
    addWebView: (webView: WebView) => void
}

const WebViewContext = React.createContext<WebViewContextType | undefined>(
    undefined,
)

const WebViewProvider = ({ children }: { children: React.ReactNode }) => {
    const webViewRefs = useRef<WebView[]>([])
    const addWebView = useCallback((webView: WebView) => {
        webViewRefs.current?.push(webView)
    }, [])
    return (
        <WebViewContext.Provider value={{ webViewRefs, addWebView }}>
            {children}
        </WebViewContext.Provider>
    )
}
export { WebViewProvider, WebViewContext }
