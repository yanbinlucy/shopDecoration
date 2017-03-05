var utils = function(){
    return {
        /**
         * 初始化拖拽排序
         * params为参数对象
         */
        initDragSort: function(params){
            var draggable = params.draggable,
                connectToSortable = params.connectToSortable,
                helper = params.helper || 'clone',
                dstart = params.callback && params.callback.dstart,
                ddrag = params.callback && params.callback.ddrag,
                dstop = params.callback && params.callback.dstop,
                sortable = params.sortable,
                connectWith = params.connectWith,
                opacity = params.opacity || .35,
                placeholder = params.placeholder || 'ui-state-highlight',
                sstart = params.callback && params.callback.sstart,
                schange = params.callback && params.callback.schange,
                sstop = params.callback && params.callback.sstop;

            $(draggable).draggable({
                connectToSortable: connectToSortable,
                helper: helper,
                start: dstart,
                drag: ddrag,
                stop: dstop
            });
            $(sortable).sortable({
                connectWith: connectWith,
                opacity: opacity,
                placeholder: placeholder,
                start: sstart,
                change: schange,
                stop: sstop
            });
        },

        uploadImg: function(params) {
            var fr = new FileReader();
            fr.onloadend = function(e) {
                params.target.append('<span><img src="' + e.target.result + '" /><i>x</i></span>');
                params.callback && params.callback();
            };
            fr.onerror = function() {
                params.target.append('<span><img src="' + params.defaultSrc + '" /><i>x</i></span>');
            };
            fr.readAsDataURL(params.file);
        },
        /**
         * 初始化zTree
         * params为参数对象
         */
        initzTree: function(params){
            var _this = this,
                tree = params.tree || 'tree',
                showLine = params.setting && params.setting.showLine,
                showIcon = params.setting && params.setting.showIcon,
                selectedMulti = params.setting && params.setting.selectedMulti || false,
                showTitle = params.setting && params.setting.showTitle,
                width = params.setting && params.setting.width || 250,
                height = params.setting && params.setting.height || 300,
                settingData = params.setting && params.setting.data,
                simpleData = settingData && settingData.simpleData,
                enable = simpleData && simpleData.enable,
                idKey = simpleData && simpleData.idKey || 'id',
                pIdKey = simpleData && simpleData.pIdKey || 'pId',
                rootPId = simpleData && simpleData.rootPId || '',
                settingAsync = params.setting && params.setting.async,
                asyncEnable = settingAsync && settingAsync.enable || false,
                asyncUrl = settingAsync && settingAsync.url || '',
                asyncAutoParam = settingAsync && settingAsync.autoParam || [],
                asyncContentType = settingAsync && settingAsync.contentType || 'application/x-www-form-urlencoded',
                asyncType = settingAsync && settingAsync.type || 'post',
                asyncOtherParam = settingAsync && settingAsync.otherParam || [],
                asyncDataFilter = settingAsync && settingAsync.dataFilter || null,
                asyncDataType = settingAsync && settingAsync.dataType || 'text';

            showLine = typeof showLine != 'undefined' ? showLine : true;
            showIcon = typeof showIcon != 'undefined' ? showIcon : true;
            showTitle = typeof showTitle != 'undefined' ? showTitle : true;
            enable = typeof enable != 'undefined' ? enable : true;
            //初始化树的高宽
            $('#'+tree).parent('.tree-wrapper').css({
                width: width,
                height: height
            });

            var setting = {
                view: {
                    dblClickExpand: false,
                    showLine: showLine,//显示连接线
                    showIcon: showIcon,//显示图标
                    showTitle: showTitle,//显示鼠标悬浮提示
                    selectedMulti:  selectedMulti//是否允许多选
                },
                async: {
                    enable: asyncEnable,//设置 zTree 是否开启异步加载模式
                    url: asyncUrl,//Ajax 获取数据的 URL 地址
                    autoParam: asyncAutoParam,//异步加载时需要自动提交父节点属性的参数
                    contentType: asyncContentType,//Ajax 提交参数的数据类型
                    type: asyncType,//Ajax 的 http 请求模式
                    otherParam: asyncOtherParam,//Ajax 请求提交的静态参数键值对
                    dataFilter: asyncDataFilter, //用于对 Ajax 返回数据进行预处理的函数
                    dataType: asyncDataType //Ajax 获取的数据类型
                },
                data: {
                    simpleData: {
                        enable: enable,//使用简单数据模式
                        idKey: idKey,//节点数据中保存唯一标识的属性名称,setting.data.simpleData.enable = true 时生效
                        pIdKey: pIdKey,//节点数据中保存其父节点唯一标识的属性名称。[setting.data.simpleData.enable = true 时生效]
                        rootPId: rootPId
                    }
                },
                callback: {
                    beforeClick: params.callback && params.callback.beforeClick,//用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
                    onClick: params.callback && params.callback.click,//用于捕获节点被点击的事件回调函数
                    beforeDblClick: params.callback && params.callback.beforeDblClick,//用于捕获 zTree 上鼠标双击之前的事件回调函数，并且根据返回值确定触发 onDblClick 事件回调函数
                    onDblClick: params.callback && params.callback.onDblClick,//用于捕获 zTree 上鼠标双击之后的事件回调函数
                    beforeCollapse: params.callback && params.callback.beforeCollapse,//用于捕获父节点折叠之前的事件回调函数，并且根据返回值确定是否允许折叠操作
                    onCollapse: params.callback && params.callback.onCollapse,//用于捕获节点被折叠的事件回调函数
                    beforeExpand: params.callback && params.callback.beforeExpand,//用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
                    onExpand: params.callback && params.callback.onExpand,//用于捕获节点被展开的事件回调函数
                    beforeAsync: params.callback && params.callback.beforeAsync,//用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
                    beforeClick: params.callback && params.callback.beforeClick,//用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
                    onRightClick: params.callback && params.callback.onRightClick//用于捕获 zTree 上鼠标右键点击之后的事件回调函数
                }
            };

            var t = $('#'+tree);
            t = $.fn.zTree.init(t, setting, params.zNodes);//初始化zTree
            
            return $.fn.zTree.getZTreeObj(tree);//通过treeId（即最外层的ul的id） 获取 zTree 对象的方法
        }
    };
}();

var components = function() {
    $(document).ready(function() {
        components.init();
    });

    var curEdit = null;

    return {
        init: function() {
        	this.initEvent();
        	this.initLayout();
        },

        initEvent: function(){
            var _this = this;
            //删除方法
        	$(document).delegate('.del-op', 'click', function(e){
            	$(this).closest('.components-drag').remove();
            });
            //轮播图编辑方法
            $(document).delegate('.slider-images .edit-op', 'click', function(e){
                curEdit = this;
                _this.editSliderComponents(this);
            });
            //tab页切换
            $(document).delegate('.layout-tab .layout-tab-nav li', 'click', function(e){
                e.stopPropagation();
                var _index = $(this).index();
                $(this).closest('.layout-tab').find('.layout-tab-content').eq(_index).addClass('show').siblings().removeClass('show');
            });
            //图片上传
            $(document).delegate('.uploadImg', 'change', function(e) {
                e.preventDefault();

                var data = new FormData(),
                    file = $(this)[0].files[0],
                    _this = this,
                    _parent = $(_this).closest('.common-dialog-box');
                
                utils.uploadImg({
                    file: file,
                    target: _parent.find('.upload-wrapper'),
                    defaultSrc: '',
                    callback: function () {
                        //此处解决input file change只执行一次
                        $(_this).replaceWith('<input class="uploadImg" type="file" accept="image/gif,image/png,,image/jpg,,image/jpeg">');
                    }
                });
            });
            //删除图片上传
            $(document).delegate('.upload-wrapper i', 'click', function(e){
                $(this).parent().remove();
            });
            //隐藏弹出框
            $('.close-btn').on('click', function(e){
                _this.hideMask();
            });
            //保存弹出框
            $('.save-btn span').on('click', function(e){
                _this.saveDialog();
            });
            //从资源库选择
            $('.resource-lib p span').on('click', function(e){
                if($('.rl-images-list').css('display')=='none'){
                    $('.rl-images-list').show();
                }else {
                    $('.rl-images-list').hide();
                }
            });
            //选中资源库图片
            $('.rl-images-list li').on('click', function(e){
                if($(this).hasClass('selected')){
                    $(this).removeClass('selected');
                }else {
                    $(this).addClass('selected');
                }
            });

            /*$(window).on('scroll', function(){
                var docTop = $(document).scrollTop();
                console.log(docTop)
                if(docTop>100){
                    $('.components').css({
                        position: 'fixed',
                        top: 0
                    });
                }
            });*/

        },
        //编辑图片方法
        editSliderComponents: function(obj){
            var _this = this,
                _parent = $(obj).closest('.components-drag__show');

            if(_parent.find('.layout-slider ul li').length){
                var str = '';
                _parent.find('.layout-slider ul li').each(function(index,item){
                    var _url = $(item).attr('data-img');
                    str += '<span><img src="' + _url + '" /><i>x</i></span>';
                });
                $('.edit-dialog .upload-wrapper').append(str);
            }else{
                $('.upload-wrapper').empty();
            }

            _this.showMask();
        },

        //编辑框保存
        saveDialog: function(){
            var _parent = null,
                _this = this;
            if($(curEdit).closest('.slider-images').length){//如果是保存轮播图
                _parent = $(curEdit).closest('.slider-images');
                var imgArr = [],
                    imgstr = '';
                $('.upload-wrapper span').each(function(index, item){
                    var src = $(this).find('img').attr('src');
                    imgArr.push(src);
                });

                _parent.find('.slider ul').empty();
                _parent.find('.slider ol').remove();

                for(var i=0; i<imgArr.length; i++) {
                    imgstr += '<li data-img="'+imgArr[i]+'">';
                }
                _parent.find('.slider ul').append(imgstr);

                _this.initSlider(_parent);
            }else {
                _parent = $(curEdit).closest('.components-drag__show');
            }

            _this.hideMask();
        },
        //显示编辑框
        showMask: function(){
            $('body').css('overflow', 'hidden');
            $('.edit-dialog').show();
            $('.edit-dialog-mask').height($(window).height()).show();
        },
        //隐藏编辑框
        hideMask: function(){
            $('body').css('overflow', 'auto');
            $('.edit-dialog').hide();
            $('.edit-dialog-mask').hide();

            this.clearDialog();
        },

        //清空编辑框，还原设置
        clearDialog: function(){
            $('.upload-wrapper').empty();
        },

        initLayout: function(){
            //初始化初级组件
            this.initCommonUI();
            //初始化布局组件
            this.initLayoutUI();
            //初始化高级组件
            this.initHighUI();
            //初始化图片组件
            this.initImagesUI();
        },

        initCommonUI: function(){
            //基础组件
            utils.initDragSort({
                draggable: '.common-ui .draggable',
                connectToSortable: '.container .droppable',
                sortable: '.container .droppable',
                connectWith: '.container .droppable',
                callback: {
                    dstart: function(event, ui) {
                        ui.helper.css('cursor','move');
                    },
                    ddrag: function(event, ui) {
                        ui.helper.css({
                            'width': '80px',
                            'height': '80px',
                            'display': 'block',
                            'min-height': '30px',
                        });
                        ui.helper.find('ui-draggable').css('display', 'none');
                        if($('.ui-state-highlight').length==0){
                            ui.helper.css('cursor', 'not-allowed');
                        }else{
                            ui.helper.css('cursor','move');
                        }
                    },
                    dstop: function(event, ui) {
                        $('.droppable').sortable({
                            connectWith: '.droppable',
                            opacity: .35,
                            placeholder: "ui-state-highlight"
                        });
                        ui.helper.css({
                            width: '100%',
                            opacity: 1,
                            height: 'inherit'
                        });
                        ui.helper.find('.components-drag__show').show();
                        ui.helper.find('.components-drag__base').hide();
                    }
                }
            });
        },

        initLayoutUI: function(){
            //tab组件
            utils.initDragSort({
                draggable: '.layout-ui .draggable',
                connectToSortable: '.components-drag .droppable',
                sortable: '.components-drag .droppable',
                connectWith: '.components-drag .droppable',
                callback: {
                    dstart: function(event, ui) {
                        ui.helper.css('cursor','move');
                    },
                    ddrag: function(event, ui) {
                        ui.helper.css({
                            'width': '80px',
                            'height': '80px',
                            'display': 'block',
                            'min-height': '30px',
                        });
                        ui.helper.find('ui-draggable').css('display', 'none');
                        if($('.ui-state-highlight').length==0){
                            ui.helper.css('cursor', 'not-allowed');
                        }else{
                            ui.helper.css('cursor','move');
                        }
                    },
                    dstop: function(event, ui) {
                        $('.components-drag .droppable').sortable({
                            connectWith: '.components-drag .droppable',
                            opacity: .35,
                            placeholder: "ui-state-highlight"
                        });
                        console.log(ui.helper)
                        ui.helper.css({
                            width: '100%',
                            opacity: 1,
                            height: 'inherit'
                        });
                        ui.helper.find('.components-drag__show').show();
                        ui.helper.find('.components-drag__base').hide();
                        ui.helper.find('.layout-tab').css('width','100%');
                        ui.helper.find('.layout-tab-content__wrapper').css('width','100%');
                    }
                }
            });
        },

        initHighUI: function(){
            //高级组件
            utils.initDragSort({
                draggable: '.high-ui .draggable',
                connectToSortable: '.components-drag .droppable',
                sortable: '.components-drag .droppable',
                connectWith: '.components-drag .droppable',
                callback: {
                    dstart: function(event, ui) {
                        ui.helper.css('cursor','move');
                    },
                    ddrag: function(event, ui) {
                        ui.helper.css({
                            'width': '80px',
                            'height': '80px',
                            'display': 'block',
                            'min-height': '30px',
                        });
                        ui.helper.find('ui-draggable').css('display', 'none');
                        if($('.ui-state-highlight').length==0){
                            ui.helper.css('cursor', 'not-allowed');
                        }else{
                            ui.helper.css('cursor','move');
                        }
                    },
                    dstop: function(event, ui) {
                        $('.droppable').sortable({
                            connectWith: '.droppable',
                            opacity: .35,
                            placeholder: "ui-state-highlight"
                        });
                        console.log(ui.helper.html())
                        ui.helper.css({
                            width: '100%',
                            opacity: 1,
                            height: 'inherit'
                        });
                        ui.helper.find('.components-drag__show').show();
                        ui.helper.find('.components-drag__base').hide();
                        if(ui.helper.find('.layout-tree').length>0){
                            ui.helper.css({
                                width: '220px'
                            });
                            ui.helper.find('.layout-tree ul').attr('id','commonTreeShow');
                            components.initTree();
                        }
                    }
                }
            });
        },

        initImagesUI: function(){
            //图片组件
            utils.initDragSort({
                draggable: '.images-ui .draggable',
                connectToSortable: '.components-drag .droppable',
                sortable: '.components-drag .droppable',
                connectWith: '.components-drag .droppable',
                callback: {
                    dstart: function(event, ui) {
                        ui.helper.css('cursor','move');
                    },
                    ddrag: function(event, ui) {
                        ui.helper.css({
                            'width': '80px',
                            'height': '80px',
                            'display': 'block',
                            'min-height': '30px',
                        });
                        ui.helper.find('ui-draggable').css('display', 'none');
                        if($('.ui-state-highlight').length==0){
                            ui.helper.css('cursor', 'not-allowed');
                        }else{
                            ui.helper.css('cursor','move');
                        }
                    },
                    dstop: function(event, ui) {
                        $('.droppable').sortable({
                            connectWith: '.droppable',
                            opacity: .35,
                            placeholder: "ui-state-highlight"
                        });
                        ui.helper.css({
                            width: '100%',
                            opacity: 1,
                            height: 'inherit'
                        });
                        ui.helper.find('.components-drag__show').show();
                        ui.helper.find('.components-drag__base').hide();
                        if(ui.helper.find('.layout-slider').length>0){//轮播图插件
                            components.initSlider(ui.helper);
                        }


                    }
                }
            });
        },

        //banner轮播
        initSlider: function(obj){
            var _this = this;
            $(obj).find('.slider ul li').each(function(index,item){
                var _src = $(item).attr('data-img');
                $(item).css({
                    'background': 'url('+_src+') center center no-repeat'
                });
                if(index==0){
                    $(item).addClass('current');
                }
            });
            //生成轮播点
            var len = $(obj).find('.slider ul li').length;
            var olStr = '<ol>';
            for(var i=0; i<len; i++){
                if(i==0){
                    olStr += '<li class="current"></li>';
                }else{
                    olStr += '<li></li>';
                }
            }
            olStr += '</ol>';
            $(obj).find('.slider').append(olStr);

            //初始化滚动
            _this.initScroll(obj);
        },

        //轮播动画
        initScroll: function(obj){
            var len = $(obj).find('.slider ul li').length,
                _ulLi = $(obj).find('.slider ul li'),
                _olLi = $(obj).find('.slider ol li');
            var timer = setInterval(function(){
                var _index = $(obj).find('.slider ul li.current').index();
                if(_index==len-1){
                    //$('#slider ul').css('left',0);
                    _ulLi.eq(0).addClass('current').siblings().removeClass('current');
                    _olLi.eq(0).addClass('current').siblings().removeClass('current');
                }else{
                    //$('#slider ul').css('left','-'+(_index+1)*100+'%');
                    _ulLi.eq(_index+1).addClass('current').siblings().removeClass('current');
                    _olLi.eq(_index+1).addClass('current').siblings().removeClass('current');
                }
            },4000);

            //绑定
            _olLi.on('click', function(e){
                var _index = $(this).index();
                $(this).addClass('current').siblings().removeClass('current');
                _ulLi.eq(_index).addClass('current').siblings().removeClass('current');
            });
        },

        initTree: function(){
            //构建zTree的数据结构
            var zNodes = [{
                    id: 0,
                    name: "根结点",
                    open: true
                }, {
                    id: 1,
                    pId: 0,
                    name: "一级树节点",
                    open: true
                }, {
                    id: 101,
                    pId: 1,
                    name: "二级树节点"
                }, {
                    id: 102,
                    pId: 1,
                    name: "二级树节点"
                }, {
                    id: 103,
                    pId: 1,
                    name: "二级树节点"
                }, {
                    id: 114,
                    pId: 1,
                    name: "二级树节点"
                },

                {
                    id: 1141,
                    pId: 114,
                    name: "三级树节点"
                }, {
                    id: 1142,
                    pId: 114,
                    name: "三级树节点"
                }, {
                    id: 1143,
                    pId: 114,
                    name: "三级树节点"
                }, {
                    id: 1144,
                    pId: 114,
                    name: "三级树节点"
                }, {
                    id: 1145,
                    pId: 114,
                    name: "三级树节点"
                }, {
                    id: 1146,
                    pId: 114,
                    name: "三级树节点"
                },

                {
                    id: 2,
                    pId: 0,
                    name: "一级树节点",
                    open: false
                }, {
                    id: 201,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 206,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 207,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 208,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 202,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 203,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 204,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 209,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 210,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 211,
                    pId: 2,
                    name: "二级树节点"
                }, {
                    id: 205,
                    pId: 2,
                    name: "二级树节点"
                },

                {
                    id: 3,
                    pId: 0,
                    name: "一级树节点",
                    open: false
                }, {
                    id: 301,
                    pId: 3,
                    name: "二级树节点"
                }, {
                    id: 302,
                    pId: 3,
                    name: "二级树节点"
                }, {
                    id: 303,
                    pId: 3,
                    name: "二级树节点"
                }, {
                    id: 304,
                    pId: 3,
                    name: "二级树节点"
                }, {
                    id: 305,
                    pId: 3,
                    name: "二级树节点"
                }, {
                    id: 306,
                    pId: 3,
                    name: "二级树节点"
                }
            ];

            //普通树
            var commonzTree = utils.initzTree({
                tree: 'commonTreeShow',//为最外层ul的id的值(必填)
                setting: {
                    showLine: true, //显示连接线
                    showIcon: false, //显示按钮
                    selectedMulti: false, //允许多选
                    showTitle: true,//显示鼠标悬浮提示
                    width: 261, //树的宽度
                    height: 532 //树的高度
                },
                zNodes: zNodes, //(必填)
                callback: {
                    //定义鼠标点击节点前的事件，该事件可以处理在点击选中前对该节点进行处理
                    beforeClick: function(treeId, treeNode) {

                    },
                    //定义鼠标点击节点的事件，该事件可以处理在点击选中时对该节点进行处理
                    click: function(event, treeId, treeNode) { //树节点点击事件
                        alert('treeNode.id=' + treeNode.id + '; treeNode.pId=' + treeNode.pId + '; treeNode.tId=' + treeNode.tId + '; treeNode.name=' + treeNode.name);
                    }
                }
            });
        }


    };
}();
