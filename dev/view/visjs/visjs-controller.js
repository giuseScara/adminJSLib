"use strict";
define(['vis','css!style/stats','css!view_style/visjs/visjs-style'], function(vis) {
  angular.module("MainAppModule").register.controller("VisjsController", VisjsController);
  VisjsController.$inject = ["$scope"];

  function VisjsController($scope) {
    var imgServer = "img/server-icon.png", imgHost = "img/computer-icon.png", imgInternet = "img/firewall-icon.png";
    var vm = this;
    vm.selectNode = { id: -1, label: 'New node' };
    vm.showInfoNode = false;
    vm.typeNode = [{ label: 'Server', type: imgServer, shape: 'image' },
                  { label: 'Host', type: imgHost, shape: 'image' },
                  { label: 'Internet', type: imgInternet, shape: 'image' }];
    vm.showBoxInformationNode = function() {
      vm.showInfoNode = true;
    }//showBoxInformationNode
    vm.hideBoxInformationNode = function() {
      vm.showInfoNode = false;
    }//hideBoxInformationNode
    vm.addNode = function() {
      vm.showInfoNode = true;
      vm.selectNode.id = nodes.length + 1;
      nodes.add(vm.selectNode);
      network.selectNodes([vm.selectNode.id], true);
    }//addNode
    vm.deleteNode = function() {
      var deleteElement = network.getSelection();
      var nodesToDelete = deleteElement.nodes;
      var edgesToDelete = deleteElement.edges;
      nodes.remove(nodesToDelete);
      nodes.flush();
      edges.remove(edgesToDelete);
      edges.flush();
      network.redraw();
    }//deleteNode
    vm.updateChart = function() {
      vm.selectNode.shape = 'image';
      nodes.update(vm.selectNode);
    }//updateChart

    var nodesData = [
     {id: 1,  label: 'DNS Server', image: imgServer, shape: 'image'},
     {id: 2,  label: 'Host 2', image: imgHost, shape: 'image'},
     {id: 3,  label: 'Host 3', image: imgHost, shape: 'image'},
     {id: 4,  label: 'Host 4', image: imgHost, shape: 'image'},
     {id: 5,  label: 'Host 5', image: imgHost, shape: 'image'},
     {id: 6,  label: 'Internet', image: imgInternet, shape: 'image'}
   ];

   // create an array with edges
   var edgesData = [
     {from: 2, to: 1},
     {from: 3, to: 1 },
     {from: 4, to: 1},
     {from: 5, to: 1},
     {from: 1, to: 6}
   ];

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
     }//redraw

     // create a network
     var container = document.getElementById('mynetwork');

     // provide the data in the vis format
     var data = {
         nodes: nodes,
         edges: edges
     };

     var options = {
        edges:{
          arrows: {
            to:     {enabled: true, scaleFactor:1},
            middle: {enabled: false, scaleFactor:1},
            from:   {enabled: false, scaleFactor:1}
          }
        },
        layout: {
          randomSeed: undefined,
          improvedLayout:true,
          hierarchical: {
            enabled:true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 100,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'directed'   // hubsize, directed
          }
        }
     };

     // initialize your network!
     var network = new vis.Network(container, data, options);

  }//VisjsControllers
});
