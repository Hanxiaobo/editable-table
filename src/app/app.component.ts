import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zy-editable';
  tableConfig = [
    { name: 'Path', key: 'Path', type: 'text', search: true },
    {
      name: '开关', key: 'SecureOnly', type: 'boolean',
      filters: [{ name: 'open', value: true }, { name: 'close', value: false }]
    },
    {
      name: '选择', key: 'CaseSensitive', type: 'select',
      filters: [{ name: 'Any Field Type', value: '' }, { name: 'Checkbox', value: 'checkbox' }, { name: 'Hidden', value: 'hidden' }, { name: 'Radio', value: 'radio' }, { name: 'Select', value: 'select' }, { name: 'Text', value: 'text' }, { name: 'Textarea', value: 'textarea' }]
    }];
  data = [{Path: "^\/URI$", SecureOnly: true, CaseSensitive: "checkbox"}];

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
