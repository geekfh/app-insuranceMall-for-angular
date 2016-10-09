angular.module('app.package.service', ['app.urltpl'])
    .factory('packageService',['$http','urlTplService','urlCrowdService',
        function ($http,urlTplService,urlCrowdService,httpInterceptor ) {
            return {
                /*//////众筹/////////////////////////*/
                /*显示互助项目列表 -- 从微信公众号进来或钱盒进来*/
                showHelpList:function(params){
                    var url = urlCrowdService.params('/project/list.json', params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*判断某个账户某个项目下是否添加过被保障人*/
                getHelpIshadperon:function(params){
                    var url = urlCrowdService.params('/project/ishadperon.json', params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*盒子大病互助计划*/
                getHelpDetail:function(params){
                    var url = urlCrowdService.params('/project/detail.json', params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*判断用户和手机是否绑定*/
                getHelpIsbundled:function(params){
                    var url = urlCrowdService.params('/account/isbundled.json', params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*登录 -- 短信验证码*/
                getHelpVerifyCode:function(params){
                    var url = urlCrowdService.params('/sms/sendVerifyCode.json',params);
                    return $http.get(url).then(function(resp){
                            return resp.data;
                        }
                    )
                },
                /*登录*/
                getHelpLogin:function(params){
                    var url = urlCrowdService.params('/account/login.json',params);
                    return $http.post(url).then(function(resp){
                            return resp.data;
                        }
                    )
                },
                /*添加被保障人*/
                getHelpAddPerson:function(hParams,bParams){
                    var url = urlCrowdService.params('/account/addperson.json',hParams);
                    return $http.post(url,bParams).then(function(resp){
                            return resp.data;
                        }
                    )
                },
                /*参加互助项目列表 -- 个人中心*/
                getHelpProjectlist:function(params){
                    var url = urlCrowdService.params('/account/projectlist.json',params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*获取某个项目下被保障人列表 -- 盒子大病互助计划*/
                getHelpPersonList:function(params){
                    var url = urlCrowdService.params('/account/personlist.json',params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*获取某一个已付款用户的详情*/
                getHelpPersondetail:function(params){
                    var url = urlCrowdService.params('/account/persondetail.json',params);
                    return $http.get(url).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*获取被保障人账单支付流水*/
                getHelpPayFlowList:function(hParams,bParams){
                    var url = urlCrowdService.params('/account/payflowlist.json',hParams);
                    return $http.post(url,bParams).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },
                /*支付--预下单*/
                getHelpPreorder:function(hParams,bParams){
                    var url = urlCrowdService.params('/pay/preorder.json',hParams);
                    return $http.post(url,bParams).then(function(resp){
                        console.log(resp)
                        return resp.data;
                    })
                },




            }
    }])
    //瀑布流分页数据
    //.factory('Reddit', ['$http','urlTplService', function ($http, urlTplService) {
    //    var Reddit = function(url, params) {
    //        this.data = [];
    //        this.busy = false;
    //        this.after = 1;
    //        this.url = url;
    //        this.params = params;
    //    };
    //
    //    Reddit.prototype.nextPage = function (extendParams) {
    //        if (this.isEnded || this.busy) return;
    //        this.busy = true;
    //
    //        var url = urlTplService.get(this.url),
    //            page = this.params.page;
    //
    //        if(extendParams){   //扩展参数
    //            for(o in extendParams){this.params[o] = extendParams[o];}
    //        }
    //        page.page = this.after;
    //        $http.post(url, this.params).success(function (resp) {
    //
    //            var items = resp.data;
    //            if((!items || items.length==0) && this.after == 1) return this.empty = true;
    //            if(items) this.after += 1;
    //
    //            for (var i = 0; i < items.length; i++) {
    //                this.data.push(items[i]);
    //            }
    //            this.busy = false;
    //            this.empty = false;
    //            this.isEnded = (items && items.length>=page.rows) ? false : true;
    //        }.bind(this));
    //    };
    //    return Reddit;
    //}]);
