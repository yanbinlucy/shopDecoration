/**
 * @author zhang xuanbin
 * @time   2017/03/06
 * @desc   此为店铺装修封装的初始化类
 **/
var utils = function(){
	$(document).ready(function(){
		utils.initSlider();
	});
	return {
		//banner轮播
        initSlider: function(){
            var _this = this;
            $('.common-box .layout-slider').each(function(){
            	var obj = this;
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
            })
            
        },

        //轮播动画
        initScroll: function(obj){
            var len = $(obj).find('.slider ul li').length,
                _ulLi = $(obj).find('.slider ul li'),
                _olLi = $(obj).find('.slider ol li');
            obj.timer = setInterval(function(){
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
        /**
         * html5 API完成的图片上传方法
         * params为参数对象
         */
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