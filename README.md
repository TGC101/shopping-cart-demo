# 使用方式

## Quick Start

```
docker run -d -p 80:80 --rm tgc101/shopping-cart-demo
```

### Docker Volume 作法

```
mkdir -p /lab
git -C /lab clone  https://github.com/TGC101/shopping-cart-demo.git
docker run -d -p 80:80 -v /lab/shopping-cart-demo:/usr/share/nginx/html/ --rm tgc101/shopping-cart-demo
```


## 自定義檔案

請直接修改 js 資料夾內的 products.js 內的陣列元素，要增減多少自行決定...


```
const products = [
    {
        id: '1',
        title: '產品一',
        price: 10,
        img: 'https://picsum.photos/id/999/1200/600',
        tags: ['生活用品', '工具'],
        isAvailable: true
    },
    {
        id: '2',
        title: '產品二',
        price: 60,
        img: 'https://picsum.photos/id/1070/1200/600',
        tags: ['藥妝'],
        isAvailable: true
    },
    ....
    // 以此類推
];
```

圖片都是透過 https://picsum.photos  上產生假圖 ....


## DEMO

![](https://i.imgur.com/4k0fs1i.jpg)
