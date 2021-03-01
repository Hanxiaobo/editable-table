# ZyEditable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

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

## 打包流程
根目录下执行: npm run packagr
进入dist目录下执行： npm pack
登录npm，执行：npm publish

## 使用
html:
<zy-editable-table [id]="'test'"
[config]="tableConfig"
[lang]="tableConfigLang"
[data]="data"
(outer)="insetData($event)"></zy-editable-table>

ts:
tableConfigLang = {
    operating: '操作',
    reset: '重置',
    up: '向上出入一条',
    down: '向下插入一条',
    delete: '删除',
    formerror: '格式错误'
  }
  tableConfig = [
    {
      name: 'ip', key: 'ip', type: 'text', search: true,
      validators: function (val) {
        var str = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        return str.test(val)
      }
    },
    {
      name: '开关', key: 'show', type: 'boolean',
      filters: [{ name: 'open', value: true }, { name: 'close', value: false }]
    },
    {
      name: '选择', key: 'field', type: 'select',
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
  data = [{ ip: "1.1.1.1", show: true, field: "checkbox" }];

  insetData($event) {
    let data = JSON.parse($event)
    console.log(data)
    if (data.type === 'up') {
      console.log('向上插入')
    } else if (data.type === 'down') {
      console.log('向下插入')
    } else if (data.type === 'delete') {
      console.log('删除')
    } else if (data.type === 'edit') {
      console.log('编辑')
    }
  }
