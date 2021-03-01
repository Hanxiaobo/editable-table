import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zy-editable';
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
  data = [{ ip: "1.1.1.1", show: true, CaseSensitive: "checkbox" }];

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
}
