# Selenium - JSテストツール

## 準備

```sh
$ npm install
$ npm run chrome-install
```

## 実行

```sh
$ npm run <scriptname> <binarypath> <url>
```

## その他

- キャッシュを利用せずブラウザを立ち上げる  
  --disable-application-cache → driver.manage().deleteAllCookies();  
  ※もしくは–disable-cache

```
dc.setCapability("applicationCacheEnabled", "false"); can also be written as, 
dc.setCapability(CapabilityType.SUPPORTS_APPLICATION_CACHE, false);
```
