$(document).ready(function(){
	function viewModel() {
		var self = this;
	    self.fileName=ko.observable("");
	    self.fileSource=ko.observable("");

	    self.fileContentArray = ko.observableArray();
	    self.showFileContentTable=ko.observable(false);

	    self.logArray = ko.observableArray();

	    self.searchPackage = function(){
	    	console.log(self.fileName());
	    	console.log(self.fileSource());
	    	$.ajax({
				url: self.fileSource()+'/'+self.fileName()+'.j',
				crossDomain: true,
				success: function(data){
					self.fileContentArray([]);
					console.log(JSON.parse(data));
					console.log(JSON.parse(data).data);
					self.fileContentArray(JSON.parse(data).data);
					self.logArray.push({number:self.fileName(),source:self.fileSource(),data:JSON.parse(data).data});
					self.showFileContentTable(true);
					console.log(self.logArray());
				}
			});
	    };

	    self.showLogContentTable = function(item){
	    	console.log(item.data);
	    	self.fileName("");
	    	self.fileSource("");
	    	self.fileContentArray([]);
	    	self.fileName(item.number);
	    	self.fileSource(item.source);
	    	self.fileContentArray(item.data);
	    };

	};

	var vm = new viewModel();

	ko.applyBindings(vm);
});