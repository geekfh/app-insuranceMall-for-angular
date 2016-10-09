angular.module('app.package.controller', ['app.package.service','app.urltpl'])

//------------
//盒子大病互助计划 -- 首页
//------------
    .controller('homeCtrl', ['$scope', '$stateParams','getUrlParams','packageService','$state','$timeout',function ($scope, $stateParams,getUrlParams,packageService,$state,$timeout) {

        $scope.activeTab = '0';
        $scope.packageList = [];
        $scope.helpPackageList = [];
        $scope.marketIn = $scope.source; //支付方式 "weixin" ， "market"
        /*var projectId; //项目id*/

        $scope.answerLabel = '1';
        $scope.ruleLabel;
        $scope.projectDetail = {};
        //$scope.joinLabel=false;
        $scope.buyTipLabel = false;
        var projectId;
        $scope.helpButtonName = "立即加入";
        var InNum = '0';
        if($scope.marketIn == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }

        /*//根据不同类型获取保险产品列表
        $scope.gotoHelpPlan = function(helpPackag){
            var projectId = helpPackag.projectId;
            sessionStorage.setItem('projectId',projectId);
            $state.go("helpTogether");
        }*/
        ///////////////////////////////////////////////
        /*显示互助项目列表 + 盒子大病互助计划*/
        packageService.showHelpList({status:'1',source:InNum}).then(
            function(resp) {
                if (resp.base.code==0) {
                    console.log(resp);
                    $scope.helpPackageList = resp.dataList;
                    projectId = $scope.helpPackageList[0].projectId
                    sessionStorage.setItem('projectId',projectId);
                    $scope.projectDetail = $scope.helpPackageList[0];

                    /*判断某个账户某个项目下是否添加过被保障人*/
                    packageService.getHelpIshadperon({source:InNum,projectId:projectId}).then(
                        function(resp) {
                            if (resp.base.code==0) {
                                if(resp.data.hadPerson == true){
                                    $scope.helpButtonName = "查看详情";
                                }
                            }
                        }
                    );
                }
            }
        );


       /* var id = sessionStorage.getItem('projectId');
        packageService.getHelpDetail({id:id,source:InNum}).then(
            function(resp) {
                if (resp.base.code==0) {
                    $scope.projectDetail = resp.data;
                    console.log(resp);
                    /!*{
                     "data": {
                     "projectId": "pd1",
                     "title": "大病互助",
                     "amount": 10000.0,
                     "memberNum": 1,
                     "avgAmount": 0.13,
                     "status": "1",
                     "projectDesc": "大病互助计划test",
                     "psort": 1,
                     "source": "0",
                     "createTime": "2016-08-22 09:37:14",
                     "updateTime": "2016-08-22 09:37:17"
                     },
                     "base": {
                     "code": 0
                     }
                     }*!/
                }else{
                    //to do something
                }
            }
        );*/

        //保障内容点击
        $scope.protectContentLabel = '-1';
        $scope.helpSectionLabel = true;
        $scope.protectContent = function(label){
            $scope.helpSectionLabel = false;
            $scope.protectContentLabel = label;
        }
        $scope.closeProtectContent = function(){
            $scope.protectContentLabel = '-1';
            $scope.helpSectionLabel = true;
        }

        //常见问题点击
        $scope.clickQuestion = function(label){
            if(label == $scope.answerLabel){
                $scope.answerLabel = '-1';//所有的答案都不展示
            }else{
                $scope.answerLabel = label;
            }
        }
        //互助规则点击
        $scope.clickHelpRule = function(label){
            if(label == "rule"){
                $scope.ruleLabel = "rule";
            }else if(label == "reqment"){
                $scope.ruleLabel = "reqment";
            }
        }
        //关闭互助规则提示框
        $scope.closeHelpRule = function(){
            $scope.ruleLabel = "";
        }

        //点击立即加入
        $scope.joinImmediately = function(){

            packageService.getHelpIsbundled({source:InNum}).then(
                function(resp) {
                    if (resp.base.code==0) {
                        if(resp.data.success == true){//绑定了
                            $state.go('helpPlanCenter',{projectId:projectId});
                            /*$state.go("helpPlanCenter");*/
                        }else{//未绑定
                            $state.go("helpLogin");
                        }
                    }else{
                        //to do something
                    }
                }
            );

            /*$state.go("paySuccessHelp");*/
        }

        //点击 -- 查看会员公约
        $scope.gotoMemIntro = function(){
            $state.go("helpMemberIntroduce");
        }

       /*

        //根据不同类型获取保险产品列表
        function updateList(num){
            packageService.getProListData({type:num,source:InNum}).then(
                function(resp) {
                    if (resp.base.code==0) {
                        $scope.packageList = $scope.packageList.concat(resp.dataList);
                        //$scope.navBanner_img = resp.banner;
                    }else{
                    //to do something
                    }});
        }
        //初始化商品列表
        updateList($scope.activeTab);*/
        ////////////////////////////////////////////////////

        /*//切换保险类别
        $scope.tabSelect = function(tabName){
            $scope.packageList = [];
            $scope.activeTab = tabName;
            updateList($scope.activeTab);
        };*/

        //判断是否为免费的两款产品进行页面跳转
        /*$scope.jumpToDetail=function(data){
            if(data.code== 'fcb' ){
                $state.go('freeInsurex',{type:"fcb"})
            }else if(data.code== 'tdb'  ){
                $state.go('freeInsurex',{type:"tdb"})
            }else if(data.kind=='1'){
                window.location.href=data.url;
            }else{
                    $state.go('home.packageDetail.index',{id:data.id})
                }

        }

        $scope.gotoHistoryVersions = function(){
            var token = sessionStorage.getItem("token");
            window.location.href = "https://api.iboxpay.com/h5/insuranceMarket/index_s.html?token="+token;
        }

        $scope.zhonganbaoxian = function(){
            window.location.href = "https://m.zhongan.com/open/policy/policySearch"
        }

        $scope.homeIconChange = function(label){
            if(label == '0'){//首页
                //updateList($scope.activeTab);
            }else if(label == '1'){//我的订单
                $state.go('myOrder_huize');
            }
        }*/

        ////判断手指滑动方向 控制我的保单按钮的显示隐藏
        //$("body").on("touchstart", function(e) {
        //    startX = e.changedTouches[0].pageX,
        //        startY = e.changedTouches[0].pageY;
        //});
        //$("body").on("touchmove", function(e) {
        //    moveEndX = e.changedTouches[0].pageX,
        //        moveEndY = e.changedTouches[0].pageY,
        //        X = moveEndX - startX,
        //        Y = moveEndY - startY;
        //
        //    if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        //        $('#myOrderBtn').css('display','block')
        //    }
        //    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        //        $('#myOrderBtn').css('display', 'none')
        //    }
        //});

    }])


    //盒子大病互助计划 -- 首页
   /* .controller('helpTogetherCtrl', ['$scope', '$stateParams','getUrlParams','packageService','$state','$timeout', function ($scope, $stateParams,getUrlParams,packageService,$state,$timeout) {
        $scope.answerLabel = '1';
        $scope.ruleLabel;
        $scope.projectDetail = {};
        //$scope.joinLabel=false;
        $scope.buyTipLabel = false;

        var InNum = '0';
        if($scope.source == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }
        var id = sessionStorage.getItem('projectId');
        packageService.getHelpDetail({id:id,source:InNum}).then(
            function(resp) {
                if (resp.base.code==0) {
                    $scope.projectDetail = resp.data;
                    console.log(resp);
                    /!*{
                     "data": {
                     "projectId": "pd1",
                     "title": "大病互助",
                     "amount": 10000.0,
                     "memberNum": 1,
                     "avgAmount": 0.13,
                     "status": "1",
                     "projectDesc": "大病互助计划test",
                     "psort": 1,
                     "source": "0",
                     "createTime": "2016-08-22 09:37:14",
                     "updateTime": "2016-08-22 09:37:17"
                     },
                     "base": {
                     "code": 0
                     }
                     }*!/
                }else{
                    //to do something
                }
            }
        );


        //常见问题点击
        $scope.clickQuestion = function(label){
            if(label == $scope.answerLabel){
                $scope.answerLabel = '-1';//所有的答案都不展示
            }else{
                $scope.answerLabel = label;
            }
        }
        //互助规则点击
        $scope.clickHelpRule = function(label){
            if(label == "rule"){
                $scope.ruleLabel = "rule";
            }else if(label == "reqment"){
                $scope.ruleLabel = "reqment";
            }
        }
        //关闭互助规则提示框
        $scope.closeHelpRule = function(){
            $scope.ruleLabel = "";
        }

        //点击立即加入
        $scope.joinImmediately = function(){
            //$scope.joinLabel = true;

            /!*$state.go("helpHealthTip");*!/
            packageService.getHelpIsbundled({source:InNum}).then(
                function(resp) {
                    if (resp.base.code==0) {
                        if(resp.data.success == true){//绑定了
                            $state.go("helpPlanCenter");
                        }else{//未绑定
                            $state.go("helpLogin");
                        }
                    }else{
                        //to do something
                    }
                }
            );
            /!*$state.go("helpLogin");*!/
        }

    }])*/

    //盒子大病互助计划 -- 登陆界面
    .controller('helpLoginCtrl', ['$scope', '$stateParams','packageService','$state','$interval','urlTplService',function ($scope, $stateParams,packageService,$state,$interval,urlTplService) {

        $scope.paracont = "获取验证码";
        var second = 60,
        timePromise = undefined;
        var InNum = '0';
        if($scope.source == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }

        //获取验证码
        $scope.sending =false;
        $scope.getCode=function(){
            var tel=$scope.phone_help;
            if(tel != '' && tel != undefined){
                timePromise = $interval(function(){
                    if(second<=0){
                        $interval.cancel(timePromise);
                        timePromise = undefined;
                        second = 60;
                        $scope.paracont = "重发验证码";
                        $scope.sending =false;
                    }else{
                        $scope.paracont = second + "秒后可重发";
                        $scope.sending = true;
                        second--;

                    }
                },1000,100);
                packageService.getHelpVerifyCode({mobileNo:$scope.phone_help}).then(function(resp){
                })
            }
        }

        //点击登录界面
        $scope.help_login=function(){
            var InNum = '0';
            if($scope.source == "weixin"){
                InNum = '0';
            }else{
                InNum = '1'
            }
            packageService.getHelpLogin({mobile:$scope.phone_help,verifyCode:$scope.verifyNum,source:InNum}).then(function(resp){
                if(resp.data.success == true){
                    var projectId = sessionStorage.getItem('projectId');
                    $state.go('helpPlanCenter',{projectId:projectId});
                    //$state.go("helpPlanCenter");
                }else{
                    console.log("登录失败");
                }
            })

        }

    }])

    //投保健康须知
    .controller('helpHealthTipCtrl', ['$scope', '$stateParams','getUrlParams','$state','$timeout', function ($scope, $stateParams,getUrlParams,$state,$timeout) {
        $scope.helpHealthNotice = function(label){
            if(label == '1'){//部分情况有
                $scope.buyTipLabel = true;
                var timer = $timeout(function(){
                    $scope.buyTipLabel = false;
                    $state.go('home.index');//$state.go('helpTogether');
                },2000);
            }else{
                $state.go('helpAddPerson');
            }
        }

    }])

    //添加被保险人
    .controller('helpAddPersonCtrl', ['$scope', '$stateParams','packageService','getUrlParams','$state','checkId','$timeout', function ($scope, $stateParams,packageService,getUrlParams,$state,checkId,$timeout) {
        $scope.addPerson = {};
        $scope.existLabel = false;
        var InNum = '0';
        if($scope.source == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }
        //添加被保障人-- 确定按钮点击
        $scope.AddPerson_help = function(data){
            var projectId = sessionStorage.getItem('projectId');
            packageService.getHelpAddPerson({source:InNum},{name:data.name,idNumber:data.idNumber,projectId:projectId}).then(function(resp){
                if(resp.base.code == 0){
                    if(resp.data.success == false){
                        $scope.existLabel = true;
                        var timer = $timeout(function(){
                            $scope.existLabel = false;
                            $state.go('helpPlanCenter',{projectId:projectId});
                        },2000);
                    }else{
                        $state.go('helpPlanCenter',{projectId:projectId});
                    }
                }
            })
        }
        //添加被保障人-- 取消按钮点击
        $scope.cancalAdd_help = function(){
            var projectId = sessionStorage.getItem('projectId');
            $state.go('helpPlanCenter',{projectId:projectId});
            //$state.go("helpPlanCenter");
        }
        //身份证判断
        $scope.idNumberTest_help = function(num){
            $scope.idNumberLabel = idValueCheck(num)
        }
        //填写完身份证后验证身份信息
        function idValueCheck(idNumber){
            var b=0;
            return checkId.checkIdCard(idNumber,b);
        }

    }])

    //盒子大病互助计划中心
    .controller('helpPlanCenterCtrl', ['$scope', '$stateParams','packageService','getUrlParams','$state','checkId', function ($scope, $stateParams,packageService,getUrlParams,$state,checkId) {
        $scope.idNumberLabel = false;
        /*$scope.noPerson_help = true;*/
        $scope.addProtectedpersonLabel = false;
        $scope.addPerson = {};
        $scope.addPersonAgain = {};
        $scope.accountLabel = false;
        $scope.accountStateLabel = false;
        $scope.protectStateLabel = false;
       /* $scope.chooseLabel = false;*/
        /*$scope.choosePersonList = [];*/
        $scope.payMoneyCount = 0;
        $scope.personList = [];
        $scope.protectedLabel = false;
        $scope.payLabel = false;
        $scope.payFormLabel = false;
        var projectId = $stateParams.projectId;

        var InNum = '0';
        if($scope.source == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }
        //var projectId = sessionStorage.getItem('projectId');
        packageService.getHelpPersonList({projectId:$stateParams.projectId,source:InNum}).then(function(resp){
            if(resp.base.code == 0){
                $scope.personList_protected = [];//已加入被保险人
                $scope.personList_pay = [];//待支付
                $scope.title = resp.data.title;
                $scope.amount = resp.data.amount;
                $scope.memberNum = resp.data.memberNum;
                $scope.avgAmount = resp.data.avgAmount;
                $scope.personList = resp.data.personList;
                /*$scope.chooseLabel = false;
                 $scope.choosePersonList = [];*/
                for(var i=0; i<$scope.personList.length; i++){
                    if($scope.personList[i].status == '0'){
                        $scope.personList[i].chooseLabel = true;
                        $scope.personList_pay.push($scope.personList[i]);
                        $scope.payLabel = true;
                    }else{
                        $scope.personList_protected.push($scope.personList[i]);
                        $scope.protectedLabel = true;
                    }
                }
                if($scope.personList_pay.length > 0){
                    /*$scope.personList_pay[0].chooseLabel = true;*/
                    /*$scope.choosePersonList.push($scope.personList_pay[0]);*/
                    $scope.payMoneyCount = $scope.personList_pay.length * 10;
                }

            }
        })

        //身份证判断
        $scope.idNumberTest_help = function(num){
            $scope.idNumberLabel = idValueCheck(num)
        }
        //填写完身份证后验证身份信息
        function idValueCheck(idNumber){
            var b=0;
            return checkId.checkIdCard(idNumber,b);
        }

        /*!//添加被保障人-- 确定按钮点击
        $scope.AddPerson_help = function(data){
            $scope.noPerson_help = false;
        }*/

        //添加被保障人-- 添加更多被保障人按钮点击
        $scope.addProtectedPerson = function(){
            /*$scope.addProtectedpersonLabel = true;*/
            $state.go("helpHealthTip");
        }
        //添加被保障人-- 确定按钮点击--第二次弹出框
        $scope.AddPerson_again = function(data){
            $scope.addProtectedpersonLabel = false;
        }

        //被保障人详情
        $scope.personDetail = function(data){
            console.log(data);
            sessionStorage.setItem("personId",data.personId);

            $state.go('helpPersonDetail',{projectId:data.projectId,personId:data.personId});
        }

        //点击选择待支付人员
        $scope.waitToPay = function(num){
            for(var i=0; i<$scope.personList_pay.length; i++){
                if(i == num){
                    if($scope.personList_pay[i].chooseLabel == false){
                        $scope.personList_pay[i].chooseLabel = true;
                        $scope.payMoneyCount = $scope.payMoneyCount +10;
                    }else {
                        $scope.personList_pay[i].chooseLabel = false;
                        $scope.payMoneyCount = $scope.payMoneyCount -10;
                    }
                }
            }
        }

        //点击支付按钮-- 进行预支付
        $scope.preOrder = function(){

            //var projectId = sessionStorage.getItem('projectId');
            /*$scope.personList[i].chooseLabel = true;*/
            //var personId = sessionStorage.getItem('personId');
            if($scope.payMoneyCount > 0){
                var personIdArray = [];
                for(var i=0; i<$scope.personList.length; i++){
                    if($scope.personList[i].chooseLabel == true){
                        personIdArray.push($scope.personList[i].personId);
                    }
                }
                var personId = "";
                for(var i=0; i<personIdArray.length; i++){
                    if(i < personIdArray.length-1){
                        personId += personIdArray[i]+",";
                    }else{
                        personId += personIdArray[i];
                    }
                }
                packageService.getHelpPreorder({source:InNum},{projectId:projectId,personId:personId,amount:$scope.payMoneyCount*100}).then(function(resp){
                    if(resp.base.code == 0) {
                        if(resp.data.resultCode == "B0000"){
                            var result = resp.data;
                            $("#orderNo").val(result.orderNo);
                            $("#orderAmount_2").val(result.amount);
                            $("#returnUrl").val(result.returnUrl);

                            $("#frm")[0].submit();

                        }
                    }
                })
            }
        }

    }])

    //被保险人详情
    .controller('helpPersonDetailCtrl', ['$scope', '$stateParams','packageService','getUrlParams','$state','checkId', function ($scope, $stateParams,packageService,getUrlParams,$state,checkId) {
        $scope.rechargeLabel = false;
        $scope.payFlowList = [];
        $scope.helpFlowList = [];
        var projectId = $stateParams.projectId;
        var personId = $stateParams.personId;
        $scope.balanceLabel = "normal";
        $scope.chartMoney = ""; //充值金额
        var InNum = '0';
        if($scope.source == "weixin"){
            InNum = '0';
        }else{
            InNum = '1'
        }
        //微信充值--按钮点击
        $scope.toRechart = function(){
            $scope.rechargeLabel = true;
        }
        //微信充值--关闭箭头
        $scope.closeRecharge = function(){
            $scope.rechargeLabel = false;
        }

        //获取某一个已付款用户的详情
        packageService.getHelpPersondetail({personId:personId,projectId:projectId,source:InNum}).then(function(resp){
            if(resp.base.code == 0){
                var personData = resp.data;
                $scope.projectName = personData.projectName;
                $scope.name = personData.name;
                $scope.idNumber = personData.idNumber;
                if(personData.status == 0){
                    $scope.status = "未支付";
                }else if(personData.status == 1){
                    $scope.status = "等待期";
                }else if(personData.status == 2){
                    $scope.status = "保障中";
                }else if(personData.status == 3){
                    $scope.status = "暂失效中";
                }else if(personData.status == 4){
                    $scope.status = "退出";
                }
                $scope.createTime = personData.createTime;
                $scope.expiryTime = personData.expiryTime;
                $scope.balance = personData.balance;
                if(personData.balance > 50){
                    $scope.balanceLabel = "good";
                }else if(personData.balance <= 50 && personData.balance > 3){
                    $scope.balanceLabel = "normal";
                }else if(personData.balance <= 3){
                    $scope.balanceLabel = "bad";
                }

            }else{
            }
        })

        //账户--按钮点击
        $scope.accountInfo = function(){
            $scope.accountLabel = true;

            /*var projectId = sessionStorage.getItem('projectId');
            var personId = sessionStorage.getItem('personId');*/
            packageService.getHelpPayFlowList({source:InNum},{personId:personId,projectId:projectId}).then(function(resp){
                if(resp.base.code == 0){
                    $scope.payFlowList = resp.data.payFlowList;
                    $scope.helpFlowList = resp.data.helpFlowList;
                }else{
                }
            })
        }

        //保障状态点击
        $scope.protectState = function(){
            $scope.protectStateLabel = true;
        }
        //保障状态 -- 关闭
        $scope.closePeopleState = function(){
            $scope.protectStateLabel = false;//peopleStateLabel
        }

        //账户余额状态说明
        $scope.accountState = function(){
            $scope.accountStateLabel = true;
        }
        //账户余额状态说明 -- 关闭
        $scope.closeAccountState = function(){
            $scope.accountStateLabel = false;//peopleStateLabel
        }

        //充值20、50、100元
        $scope.phoneChart = function(label){
            $scope.chartLabel =  label;
            $scope.chartMoney = label;
        }

        //确认支持 -- 点击
        $scope.recharge_help = function(){
            //预支付
            if($scope.chartMoney > 0){
                packageService.getHelpPreorder({source:InNum},{projectId:projectId,personId:personId,amount:$scope.chartMoney*100}).then(function(resp){
                    if(resp.base.code == 0) {
                        if(resp.data.resultCode == "B0000"){
                            var result = resp.data;
                            $("#orderNo").val(result.orderNo);
                            $("#orderAmount_2").val(result.amount);
                            $("#returnUrl").val(result.returnUrl);

                            $("#frm")[0].submit();
                        }
                    }
                })
            }
        }

    }])

    //付款成功后的页面 -- 众筹
    .controller('paySuccessHelpCtrl', ['$scope', '$stateParams','getUrlParams','$state', function ($scope, $stateParams,getUrlParams,$state) {
/*
        var url=location.href;

        var projectId=getUrlParams.getURLRequestParam(url)['projectId'];
        sessionStorage.setItem("projectId",projectId);*/

        //支付成功-- 点击返回按钮
        $scope.paySuccess_back=function(){
            /*var url=window.location.href;//"http://127.0.0.1:3221/start.html#/paySuccessHelp"
            //http://127.0.0.1:3221/start.html#/helpPlanCenter
            var b=location.origin;//"http://127.0.0.1:3221
            //projectId:pd1  //source:0*/
            var url=location.href;
            var projectId=getUrlParams.getURLRequestParam(url)['projectId'];
            $state.go('helpPlanCenter',{projectId:projectId});
            /*https://api.iboxpay.com/h5/insuranceNew/start.html#/paySuccess
             后面带的参数
             /start.html#/paySuccess?id=" + order.getId() + "&status=" + huataiPayDto.getStatus();*/


            //$state.go('helpPlanCenter');//helpPlanCenter

            /*https://api.iboxpay.com/h5/insuranceNew/start.html#/paySuccessHelp?projectId="pd1"*/
        }

    }])

    //付款成功后的页面 -- 众筹
    .controller('payFailureHelpCtrl', ['$scope', '$stateParams','getUrlParams','$state', function ($scope, $stateParams,getUrlParams,$state) {

    /*    var url=location.href;

        var projectId=getUrlParams.getURLRequestParam(url)['projectId'];
        sessionStorage.setItem("projectId",projectId);*/

        //支付成功-- 点击返回按钮
        $scope.payFailure_back=function(){
            var url=location.href;
            var projectId=getUrlParams.getURLRequestParam(url)['projectId'];
            $state.go('helpPlanCenter',{projectId:projectId});
        }

    }])



