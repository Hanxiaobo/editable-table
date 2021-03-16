# ZyEditable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.
### angular电子表格，支持筛选、插入行、删除行、编辑表格内容、拖动列宽、拖动排序、双击文本复制
github：htts://github.com/Hanxiaobo/editable-table
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 版本发布流程
打版本号之后，
根目录下执行: npm run packagr
进入dist目录下执行： npm pack
登录npm，执行：npm publish

## 使用

```html
<zy-editable-table [id]="'test'"
[config]="tableConfig"
[lang]="tableConfigLang"
[data]="data"
(outer)="insetData($event)"></zy-editable-table>
```
```javascript
tableConfigLang = {
    operating: '操作',
    reset: '重置',
    up: '向上出入一条',
    down: '向下插入一条',
    delete: '删除',
    formerror: '格式错误',
    copy_success: '复制成功'
  }
  tableConfig = [
    {
      name: '文本', key: 'ip', type: 'text', search: true,
      validators: function (val) {
        var str = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        return str.test(val)
      }
    },
    {
      name: '长文本',
      key: 'textarea',
      type: 'textarea',
      search: true
    },
    {
      name: '开关', key: 'show', type: 'boolean',
      filters: [{ name: 'open', value: true }, { name: 'close', value: false }]
    },
    {
      name: '选择', key: 'CaseSensitive', type: 'select',
      filters: [
        { name: 'Any Field Type', value: '' },
        { name: 'Checkbox', value: 'checkbox' },
        { name: 'Hidden', value: 'hidden' },
        { name: 'Radio', value: 'radio' },
        { name: 'Select', value: 'select' },
        { name: 'Text', value: 'text' },
        { name: 'Textarea', value: 'textarea' }
      ]
    }];
  data = [
    {
      ip: "1.1.1.1",
      textarea: 'sadawieqoiwjdalksmdwoqruqpowdm.zmczoxjpoweq[wi023kd;osakdc;lsmc;23;lrmfsdl.xsadawieqoiwjdalksmdwoqruqpowdm.zmczoxjpoweq[wi023kd;osakdc;lsmc;23;lrmfsdl.xsadawieqoiwjdalksmdwoqruqpowdm.zmczoxjpoweq[wi023kd;osakdc;lsmc;23;lrmfsdl.xsadawieqoiwjdalksmdwoqruqpowdm.zmczoxjpoweq[wi023kd;osakdc;lsmc;23;lrmfsdl.xsadawieqoiwjdalksmdwoqruqpowdm.zmczoxjpoweq[wi023kd;osakdc;lsmc;23;lrmfsdl.x',
      show: true,
      CaseSensitive: "checkbox"
    }
  ];

  insetData($event) {
    let data = JSON.parse($event)
    console.log(data)
    if (data.type === 'up') {
      console.log('向上插入')
      this.data.splice(data.index, 0, {ip: '', textarea: '', show: false, CaseSensitive: ''})
    } else if (data.type === 'down') {
      console.log('向下插入')
      this.data.splice(data.index+1, 0, {ip: '', textarea: '', show: false, CaseSensitive: ''})
    } else if (data.type === 'delete') {
      console.log('删除')
      this.data.splice(data.index, 1)
    } else if (data.type === 'edit') {
      console.log('编辑')
    }
  }
```
