import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Options } from 'sortablejs';
@Component({
	selector: 'zy-editable-table',
	templateUrl: './zy-editable-table.component.html',
	styleUrls: ['./zy-editable-table.component.css']
})
export class ZyEditableTableComponent implements OnInit {
	@Input() config: any;
	@Input() data: any;
	@Input() id: string;
  @Input() lang: any;
	@Output() private outer = new EventEmitter<string>();
	showMenu = false;
	currentSelectIndex;
	copyData;

	normalOptions: Options = {
		group: 'normal-group',
	};

	filterObj = {}; //记录过滤状态
	showFilters = {};
	searchObj = {}
	showSearch = {}

	showError = {};
	constructor() {

	}

	ngOnInit(): void {
		this.currentSelectIndex = this.data.length;
	}

	ngAfterViewInit(): void {
		//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		//Add 'implements AfterViewInit' to the class.
		Promise.resolve().then(() => {
			this.customMenu();
			this.dragWidth()
		})


	}

	customMenu() {
		let _this = this
		window.document.oncontextmenu = function () { return false; };
		window.document.addEventListener('mousedown', function (e) {
			_this.showMenu = false
			_this.showFilters = {}
			_this.showSearch = {}
		})

		window.document.getElementById(_this.id + 'editable-table').onmousedown = function (e) {
			if (e.button === 2) {
				e.stopPropagation()
				_this.showMenu = true
				window.document.getElementById(_this.id + 'customMenu').style.cssText = 'top:' + e.clientY + 'px;left:' + e.clientX + 'px'
			}
		}

		window.document.getElementById(_this.id + 'customMenu').onmousedown = function (e) {
			e.stopPropagation()
		}
	}

  menuAction(type) {
		this.showMenu = false
		this.outer.emit(JSON.stringify({ type: type, index: this.currentSelectIndex }))
		Promise.resolve().then(() => {
			let index = type === 'down' ? this.currentSelectIndex + 1 : this.currentSelectIndex
			this.startEdit(this.data, this.data[index])
		})
	}

	tableAdd() {
		this.outer.emit(JSON.stringify({ type: 'down', index: this.data.length }))
		Promise.resolve().then(() => {
			this.startEdit(this.data, this.data[this.data.length-1])
		})
	}

	startEdit(data,d) {
		data.map(item => {
			if (item.isEdit) {
				delete item.isEdit
			}
		})
		this.copyData = JSON.parse(JSON.stringify(d))
		d.isEdit = true
	}

	cancelEdit(data, index) {
		delete data[index].isEdit
		if (this.showError[index]) {
			delete this.showError[index]
		}

		let hasNoValue = true
		for(let i in data[index]) {
			if (data[index][i]) {
				hasNoValue = false
			}
		}
		if (hasNoValue) {
			this.deleteData(index)
		}
	}

	deleteData(i) {
		this.outer.emit(JSON.stringify({ type: 'delete', index: i }))
	}

	clearError(index) {
		if (this.showError[index]) {
			delete this.showError[index]
		}
	}

	save(data, index) {
		let status = '';
		this.config.map(item => {
			if (item.validators && typeof item.validators === 'function') {
				status = item.validators(this.copyData[item.key])
        if (!this.showError[index]) {
          this.showError[index] = {[item.key]: status}
        } else {
          this.showError[index][item.key] = status
        }

			}
		})
		if (status) {
			return
		} else {
			delete this.showError[index]
		}
		data[index] = this.copyData
		delete data[index].isEdit
		this.outer.emit(JSON.stringify({ type: 'edit', index: index }))
	}

	dragWidth() {
		var tTD;
		var table = window.document.getElementById(this.id+'td_custom') as HTMLTableElement;

		for (var j = 0; j < table.rows[0].cells.length; j++) {
			table.rows[0].cells[j].onmousedown = function (event) {
				tTD = this;
				if (event.offsetX > tTD.offsetWidth - 10) {
					tTD.mouseDown = true;
					tTD.oldX = event.x;
					tTD.oldWidth = tTD.offsetWidth;
				}
			};
			table.rows[0].cells[j].onmouseup = function () {
				if (tTD == undefined) tTD = this;
				tTD.mouseDown = false;
				tTD.style.cursor = 'default';
			};

			table.rows[0].cells[j].onmousemove = function (event) {
				if (event.offsetX > (this as any).offsetWidth - 10)
				(this as any).style.cursor = 'col-resize';
				else
				(this as any).style.cursor = 'default';
				if (tTD == undefined) tTD = this;
				if (tTD.mouseDown != null && tTD.mouseDown == true) {
					tTD.style.cursor = 'default';
					if (tTD.oldWidth + (event.x - tTD.oldX) > 0)
						tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
					tTD.style.width = tTD.width;
					tTD.style.cursor = 'col-resize';
					table = tTD;
					while (table.tagName != 'TABLE') {
						table = table.parentElement as HTMLTableElement
					};
					for (var i = 0; i < table.rows.length; i++) {
						table.rows[i].cells[tTD.cellIndex].width = tTD.width;
					}
				}
			};
		}
	}

	openSearch(key) {
		this.searchObj[key] = this.searchObj[key] || ''
		this.showSearch[key] = true
	}

	openFilters(key) {
		if (!this.filterObj[key]) {
			this.filterObj[key] = []
		}
		this.showFilters[key] = true
	}

	filtersChange($event, key, val) {
		if ($event.checked) {
			this.filterObj[key].push(val)
		} else {
			let _index = this.filterObj[key].indexOf(val)
			_index > -1 && this.filterObj[key].splice(_index, 1)
		}
	}

	filersReset(key) {
		this.filterObj[key] = []
	}

	searchReset(key) {
		this.searchObj[key] = ''
	}

	filterData(d) {
		let status = true;
		let searchStaus = true;
		status = Object.keys(this.filterObj).every(key => {
			if (this.filterObj[key].length > 0) {
				let _index = this.filterObj[key].indexOf(d[key])
				return _index > -1
			}
			return true
		})

		searchStaus = Object.keys(this.searchObj).every(key => {
			return d[key].indexOf(this.searchObj[key]) > -1
		})
		return status && searchStaus
	}

	showFieldName(filters, val) {
		let name = ''
		filters.map(item => {
			if (val === item.value) {
				name = item.name
			}
		})
		return name
	}

  copyeStr($event,value='') {
		const oInput = document.createElement('input');
		oInput.value = value;
		document.body.appendChild(oInput);
		oInput.select();
		document.execCommand('Copy');
		oInput.parentNode.removeChild(oInput);

		let left = $event.pageX;
		let top = $event.pageY;
		let msg = document.getElementById(this.id + 'copy-success-msg');
		msg.style.top = top - 30 + 'px';
		msg.style.left = left + 'px';
		msg.style.animation = 'dsipear 3s'
	}

	animationend($event) {
		$event.target.style.animation = ''
	}
}
