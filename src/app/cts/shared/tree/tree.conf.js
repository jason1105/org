"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeConf = {
    'contextmenu': {
        'items': {
            'create': {
                'separator_before': false,
                'separator_after': true,
                '_disabled': false,
                'label': '新建',
                'action': function (data) {
                    var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                    inst.create_node(obj, {}, 'last', function (new_node) {
                        setTimeout(function () {
                            inst.edit(new_node);
                        }, 0);
                    });
                }
            },
            'rename': {
                'separator_before': false,
                'separator_after': false,
                '_disabled': false,
                'label': '修改',
                /*!
                 'shortcut'			: 113,
                 'shortcut_label'	: 'F2',
                 'icon'				: 'glyphicon glyphicon-leaf',
                 */
                'action': function (data) {
                    var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                    inst.edit(obj);
                }
            },
            'remove': {
                'separator_before': false,
                'icon': false,
                'separator_after': false,
                '_disabled': false,
                'label': '删除',
                'action': function (data) {
                    var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                    if (inst.is_selected(obj)) {
                        inst.delete_node(inst.get_selected());
                    }
                    else {
                        inst.delete_node(obj);
                    }
                }
            },
            'ccp': {
                'separator_before': true,
                'icon': false,
                'separator_after': false,
                'label': '编辑',
                'action': false,
                'submenu': {
                    'cut': {
                        'separator_before': false,
                        'separator_after': false,
                        'label': '剪切',
                        'action': function (data) {
                            var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                            if (inst.is_selected(obj)) {
                                inst.cut(inst.get_top_selected());
                            }
                            else {
                                inst.cut(obj);
                            }
                        }
                    },
                    'copy': {
                        'separator_before': false,
                        'icon': false,
                        'separator_after': false,
                        'label': '复制',
                        'action': function (data) {
                            var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                            if (inst.is_selected(obj)) {
                                inst.copy(inst.get_top_selected());
                            }
                            else {
                                inst.copy(obj);
                            }
                        }
                    },
                    'paste': {
                        'separator_before': false,
                        'icon': false,
                        '_disabled': function (data) {
                            return !$.jstree.reference(data.reference).can_paste();
                        },
                        'separator_after': false,
                        'label': '粘贴',
                        'action': function (data) {
                            var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
                            inst.paste(obj);
                        }
                    }
                }
            }
        }
    },
    'core': {
        'animation': 0,
        'check_callback': true,
        'themes': { 'stripes': true },
        'strings': {
            'Loading ...': '加载中 ...'
        }
    },
    'types': {
        'default': {
            'valid_children': ['default', 'file']
        },
        'file': {
            'icon': 'glyphicon glyphicon-file',
            'valid_children': []
        }
    },
    'checkbox': {
        'tie_selection': true
    },
    'plugins': [
        'contextmenu', 'dnd', 'checkbox', 'types'
    ]
};
