import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import * as $ from 'jquery';
import "jstree";

import {treeConf} from "./tree.conf";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'jhi-tree',
  templateUrl: './tree.component.html',
  styleUrls:['~jstree/dist/themes/default/style.css']
})
export class TreeComponent implements OnInit, OnDestroy, AfterViewInit {


  currentAccount: any;

  conf: any;
  private _data: any;
  @Output() onCheckedChange = new EventEmitter<any>();
  private changeObs: any;
  @Input() plugins: any[];
  @Input() haveChecked: any;
  private tree: any;
  @ViewChild("_id") private treeJq: any;
  // treeJq: any;
  _version: string;


  constructor() {
    // this._version = "jstree-" + Math.floor(Math.random() * 255);
    this.conf = Object.assign({}, treeConf);
  }

  ngOnInit(): void {
    // this.treeJq = $("#" + this._version);
    // this.treeJq = $("#tree");
    this.loadAll();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.tree) {
      this.tree.destroy();
    }

  }

  @Input()
  set data(data) {
    this.treeJq = $(this.treeJq.nativeElement);
    this._data = data;
    if (!isNullOrUndefined(this._data)) {
      this.conf.core.data = this._data;
      if (this.plugins && this.plugins.length > 0) {
        this.conf.plugins = this.plugins;
      }
      if (this.tree) {
        this.tree.destroy();
      }
      this.initTree();

    }

  }

  initTree() {
    $.jstree.create(this.treeJq, this.conf);
    this.tree = this.treeJq.jstree(true);
    this.treeJq.on('changed.jstree', () => {
      if (this.haveChecked) {
        this.onCheckedChange.emit({
          'bottomChecked': this.tree.get_bottom_checked('full'),
          'topChecked': this.tree.get_top_checked('full'),
          'checked': this.tree.get_checked('full')
        });
      } else {
        this.onCheckedChange.emit({
          'selected': this.tree.get_selected('full')
        });
      }
    }).on('ready.jstree', () => {
      // let treeIns = $('#tree').jstree(true);
    });
  }

  changeChecked(data) {
  }

  loadAll() {

  }


  private onError(error) {
  }
}
