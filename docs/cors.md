## CORS

Cross-origin resource sharing (**CORS**) is a mechanism that allows resources to be requested from another domain. Under the hood, this application allow the possibility of enable or disable the use of CORS with the follow environment variable:

```
CORS_ENABLED
```

This variable expect a boolean value, meaning that a **true** value will enable the feature and a **false** value will disable the feature. The default value its **false**.