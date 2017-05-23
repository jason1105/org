/**
 * Created by guome on 2017-03-10.
 */
declare var $: any;
export const treeConf = {
    // 'contextmenu': {
    //     'items': {
    //         'create': {
    //             'separator_before': false,
    //             'separator_after': true,
    //             '_disabled': false, // (this.check('create_node', data.reference, {}, 'last')),
    //             'label': '新建',
    //             'action'(data) {
    //                 let inst = $.jstree.reference(data.reference),
    //                     obj = inst.get_node(data.reference);
    //                 inst.create_node(obj, {}, 'last', function (new_node) {
    //                     setTimeout(function () {
    //                         inst.edit(new_node);
    //                     }, 0);
    //                 });
    //             }
    //         },
    //         'rename': {
    //             'separator_before': false,
    //             'separator_after': false,
    //             '_disabled': false, // (this.check('rename_node', data.reference, this.get_parent(data.reference), '')),
    //             'label': '修改',
    //             /*!
    //              'shortcut'			: 113,
    //              'shortcut_label'	: 'F2',
    //              'icon'				: 'glyphicon glyphicon-leaf',
    //              */
    //             'action'(data) {
    //                 let inst = $.jstree.reference(data.reference),
    //                     obj = inst.get_node(data.reference);
    //                 inst.edit(obj);
    //             }
    //         },
    //         'remove': {
    //             'separator_before': false,
    //             'icon': false,
    //             'separator_after': false,
    //             '_disabled': false, // (this.check('delete_node', data.reference, this.get_parent(data.reference), '')),
    //             'label': '删除',
    //             'action'(data) {
    //                 let inst = $.jstree.reference(data.reference),
    //                     obj = inst.get_node(data.reference);
    //                 if (inst.is_selected(obj)) {
    //                     inst.delete_node(inst.get_selected());
    //                 } else {
    //                     inst.delete_node(obj);
    //                 }
    //             }
    //         },
    //         'ccp': {
    //             'separator_before': true,
    //             'icon': false,
    //             'separator_after': false,
    //             'label': '编辑',
    //             'action': false,
    //             'submenu': {
    //                 'cut': {
    //                     'separator_before': false,
    //                     'separator_after': false,
    //                     'label': '剪切',
    //                     'action'(data) {
    //                         let inst = $.jstree.reference(data.reference),
    //                             obj = inst.get_node(data.reference);
    //                         if (inst.is_selected(obj)) {
    //                             inst.cut(inst.get_top_selected());
    //                         } else {
    //                             inst.cut(obj);
    //                         }
    //                     }
    //                 },
    //                 'copy': {
    //                     'separator_before': false,
    //                     'icon': false,
    //                     'separator_after': false,
    //                     'label': '复制',
    //                     'action'(data) {
    //                         let inst = $.jstree.reference(data.reference),
    //                             obj = inst.get_node(data.reference);
    //                         if (inst.is_selected(obj)) {
    //                             inst.copy(inst.get_top_selected());
    //                         } else {
    //                             inst.copy(obj);
    //                         }
    //                     }
    //                 },
    //                 'paste': {
    //                     'separator_before': false,
    //                     'icon': false,
    //                     '_disabled' (data) {
    //                         return !$.jstree.reference(data.reference).can_paste();
    //                     },
    //                     'separator_after': false,
    //                     'label': '粘贴',
    //                     'action'(data) {
    //                         let inst = $.jstree.reference(data.reference),
    //                             obj = inst.get_node(data.reference);
    //                         inst.paste(obj);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },
    'core': {
        'animation': 0,
        'check_callback': true,
        'themes': {'stripes': true},
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
        'contextmenu', 'dnd', 'checkbox', 'types', "wholerow"
    ]
};
