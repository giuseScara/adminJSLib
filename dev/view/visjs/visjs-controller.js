"use strict";
define(['vis', 'css!style/stats', 'css!view_style/visjs/visjs-style'], function(vis) {
    angular.module("MainAppModule").register.controller("VisjsController", VisjsController);
    VisjsController.$inject = ["$scope", "$timeout"];

    function VisjsController($scope, $timeout) {
        var imgServer = "img/server-icon.png",
            imgHost = "img/computer-icon.png",
            imgInternet = "img/firewall-icon.png";
        var idNewEdges = 0;
        var vm = this;
        vm.selectNode = {
            id: -1,
            label: 'New node'
        };
        vm.showMessageEdge = false;
        vm.selectEgde = {};
        vm.showInfoNode = false;
        vm.typeNode = [{
            label: 'Server',
            type: imgServer,
            shape: 'image'
        }, {
            label: 'Host',
            type: imgHost,
            shape: 'image'
        }, {
            label: 'Internet',
            type: imgInternet,
            shape: 'image'
        }];
        vm.showBoxInformationNode = function() {
            vm.showInfoNode = true;
        }; //showBoxInformationNode
        vm.hideBoxInformationNode = function() {
            vm.showInfoNode = false;
            vm.showMessageEdge = false;
        }; //hideBoxInformationNode
        vm.addNode = function() {
            vm.selectNode = {
                id: -1,
                label: 'New node'
            };
            vm.showInfoNode = true;
            vm.selectNode.id = nodes.length + 1;
            nodes.add(vm.selectNode);
            network.selectNodes([vm.selectNode.id], true);
        }; //addNode
        vm.addEdge = function() {
            vm.showMessageEdge = true;
            network.addEdgeMode();
        }; //addEdge
        vm.deleteNode = function() {
            nodes.remove(vm.selectNode);
            edges.remove(vm.selectEgdes);
        }; //deleteNode
        vm.updateChart = function() {
            vm.selectNode.shape = 'image';
            nodes.update(vm.selectNode);
        }; //updateChart

        var nodesData = [{
            id: 1,
            label: 'DNS Server',
            image: imgServer,
            shape: 'image'
        }, {
            id: 2,
            label: 'Host 2',
            image: imgHost,
            shape: 'image'
        }, {
            id: 3,
            label: 'Host 3',
            image: imgHost,
            shape: 'image'
        }, {
            id: 4,
            label: 'Host 4',
            image: imgHost,
            shape: 'image'
        }, {
            id: 5,
            label: 'Host 5',
            image: imgHost,
            shape: 'image'
        }, {
            id: 6,
            label: 'Internet',
            image: imgInternet,
            shape: 'image'
        }];

        // create an array with edges
        var edgesData = [{
            from: 2,
            to: 1
        }, {
            from: 3,
            to: 1
        }, {
            from: 4,
            to: 1
        }, {
            from: 5,
            to: 1
        }, {
            from: 1,
            to: 6
        }];

        // create an array with nodes
        var nodes = new vis.DataSet(nodesData);
        // create an array with edges
        var edges = new vis.DataSet(edgesData);

        nodes.on('add', redraw);
        nodes.on('update', redraw);
        nodes.on('remove', redraw);

        edges.on('add', redraw);
        edges.on('update', redraw);
        edges.on('remove', redraw);

        function redraw() {
            network.redraw();
        } //redraw

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 1
                    },
                    middle: {
                        enabled: false,
                        scaleFactor: 1
                    },
                    from: {
                        enabled: false,
                        scaleFactor: 1
                    }
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    enabled: true,
                    levelSeparation: 150,
                    nodeSpacing: 130,
                    treeSpacing: 120,
                    blockShifting: false,
                    edgeMinimization: false,
                    parentCentralization: false,
                    direction: 'UD', // UD, DU, LR, RL
                    sortMethod: 'hubsize' // hubsize, directed
                }
            }
        };

        edges.on('add', function(event, properties, senderId) {
          idNewEdges = properties.items[0];
        });

        // initialize your network!
        var network = new vis.Network(container, data, options);
        network.on("selectNode", function(obj) {
            $timeout(function() {
                vm.showInfoNode = true;
                $scope.$apply();
                vm.selectNode = nodes.get(obj.nodes[0]);
                vm.selectEgde = edges.get(obj.edges[0]);
            });
        });
        network.on("release", function(obj) {
            network.selectEdges([idNewEdges]);
        });
        network.on("selectEdge", function(obj) {
            $timeout(function() {
                vm.showInfoNode = true;
                $scope.$apply();
                vm.selectNode = nodes.get(obj.nodes[0]);
                vm.selectEgde = edges.get(obj.edges[0]);
            });
        });


    } //VisjsControllers
});
