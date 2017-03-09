/**
 * @author zhang xuanbin
 * @time   2017/03/06
 * @desc   此为店铺装修组件开发的交互demo，可以以此为参考，
 *         但在实际开发过程中以各自的业务需求去完成对应的组件，
 *         除了初始化组件外，其他操作均可按自己的开发习惯进行（建议统一）。
 **/
var components = function() {
    $(document).ready(function() {
        components.init();
    });

    var curEdit = null,
        tabSetting = null;

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
            //logo编辑
            $(document).delegate('.logo-drag .edit-op', 'click', function(e){
                curEdit = this;
                _this.editLogoComponents(this);
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
                        //logo图片编辑框内删除
                        if(curEdit && $(curEdit).closest('.logo-drag').length){
                            $('.imggroup').hide();
                        }
                        //此处解决input file change只执行一次
                        $(_this).replaceWith('<input class="uploadImg" type="file" accept="image/gif,image/png,,image/jpg,,image/jpeg">');
                    }
                });
            });
            //删除图片上传
            $(document).delegate('.upload-wrapper i', 'click', function(e){
                
                console.log(curEdit)
                //logo图片编辑框内删除
                if(curEdit && $(curEdit).closest('.logo-drag').length){
                    $('.imggroup').show();
                }
                $(this).parent().remove();
            });
            //隐藏弹出框
            $('.edit-dialog .close-btn').on('click', function(e){
                _this.hideMask();
            });
            //保存弹出框
            $('.edit-dialog .save-btn span').on('click', function(e){
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
            //店铺公告
            $(document).delegate('.layout-notice li', 'click', function(e){
                $('.layout-notice-dialog').show();
            });
            $(document).delegate('.layout-notice-dialog i', 'click', function(e){
                $('.layout-notice-dialog').hide();
            });

            //设置tab
            $(document).delegate('.tab .set-op', 'click', function(e){
                tabSetting = this;
                _this.showSettingTab();
            });
            //隐藏tab功能弹出框
            $('.tab-setting .setting-close').on('click', function(e){
                _this.hideTabDialog();
            });
            //删除tab编辑框中的选项卡
            $(document).delegate('.setting-box-list li i', 'click', function(e){
                $(this).closest('li').remove();
            });
            //打开添加tab
            $('.setting-add p').on('click', function(e){
                $('.setting-add .setting-item').toggle();
            });
            //添加tab
            $('.setting-add .setting-item a').on('click', function(e){
                var _text = utils.trim($('.setting-item input').val());
                if(!_text){
                    utils.showTip('选项卡不能为空！');
                    return;
                }
                _this.addTab(_text);
            });
            //保存tab
            $('.setting-save').on('click', function(e){
                var len = $('.setting-box-list li').length;
                if(!len) {
                    utils.showTip('至少添加一个选项卡！');
                    return;
                }
                _this.saveTab();
                _this.hideTabDialog();
            });
        },
        //关闭tab设置框
        hideTabDialog: function(){
            tabSetting = null;
            $('body').css('overflow', 'auto');
            $('.tab-setting').hide();
            $('.edit-dialog-mask').hide();
        },
        //显示编辑tab框
        showSettingTab: function(){
            var _parent = $(tabSetting).closest('.tab'),
                settingStr = '';
            _parent.find('.layout-tab-nav li').each(function(){
                var _text = $(this).find('a').text();
                settingStr += '<li><span>'+_text+'</span><i>X</i>';
            });
            $('.setting-box-list ul').append(settingStr);

            $('body').css('overflow', 'hidden');
            $('.tab-setting').show();
            $('.edit-dialog-mask').height($(window).height()).show();
        },
        //添加新tab
        addTab: function(_text){
            var str = '<li><span>'+_text+'</span><i>X</i>';
            $('.setting-box-list ul').append(str);
            $('.setting-item input').val('');
        },
        //保存新tab
        saveTab: function(){
            var tabStr = '',
                tabContentStr = '',
                _parent = $(tabSetting).closest('.tab'),
                len = $('.setting-box-list li').length;
                    
            $('.setting-box-list li').each(function(index,item){
                var _text = $(this).find('span').text();
                if(index===0){
                    tabStr += '<li class="selected"><a href="javascript:;">'+_text+'</a></li>';
                }else{
                    tabStr += '<li><a href="javascript:;">'+_text+'</a></li>';
                }
            });
            _parent.find('.layout-tab-nav').empty();
            _parent.find('.layout-tab-nav').append(tabStr);

            for(var i=0; i<len; i++){
                if(i==0){
                    tabContentStr += '<div class="layout-tab-content show"></div>';
                }else{
                    tabContentStr += '<div class="layout-tab-content"></div>';
                }
            }
            _parent.find('.layout-tab-content__wrapper').empty();
            _parent.find('.layout-tab-content__wrapper').append(tabContentStr);
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
            //
            $('.imggroup').show();
            //隐藏高级设置
            $('.advanced').show();
        },

        //logo编辑框
        editLogoComponents: function(obj){
            var _this = this,
                _parent = $(obj).closest('.components-drag__show');

            if(_parent.find('.layout-logo').length && _parent.find('.layout-logo img').length){
                //上传框隐藏（只能上传一个）
                $('.imggroup').hide();
                var _src = _parent.find('.layout-logo img').attr('src');
                $('.edit-dialog .upload-wrapper').append('<span><img src="' + _src + '" /><i>x</i></span>');
            }else{
                $('.upload-wrapper').empty();
            }

            _this.showMask();
            //隐藏高级设置
            $('.advanced').hide();
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
            curEdit = null;
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
                unique: true,
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
                        if(ui.helper.find('.layout-tree').length>0){
                            ui.helper.find('.layout-tree ul').attr('id','commonTreeShow');
                            //components.initTree();
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
                            utils.initSlider(ui.helper);
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
