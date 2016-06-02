/*
 D3 example of simple table
*/
var template_path = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?')+ "public=only&name=Extensions/HTMLTable/";
Qva.LoadScript(template_path + "d3.min.js",extension_Done);

function extension_Done() {
  Qva.AddExtension('HTMLTable', function() {
  // Load our css file
  Qva.LoadCSS(template_path + "/style.css");
  //this.SetOnUpdateComplete(function() {alert("on update complete called");});
  
  var _this = this;
  var qvDoc = Qv.GetCurrentDocument();
  
  // Headings
  var DimLabel = _this.Layout.Text0.text;
  var ExprLabel = _this.Layout.Text1.text;
  var curSelections = _this.Layout.Text2.text;
  console.log("selections="+curSelections);
  // workaround to get dim count
  var nDimensions = this.Data.Rows[0].filter(function(col){return !(col.color == undefined);}).length;

  var vSel = _this.Layout.Text3.text; // vSelectNow = "val with spaces; val2"
  console.log("var="+vSel + vSel.length);
  if (!((vSel.length==0) || (vSel==undefined))) {
	vSel = vSel.split(";"); 
	//console.log("val="+vSel);
	var selOne=vSel.pop();
	if (selOne.length ==0) {
		selOne=vSel.pop();
	}
	_this.Data.SelectTextsInColumn(nDimensions-1-vSel.length, true, selOne);	
	qvDoc.SetVariable("vSelectNow", vSel.join(";"));
	console.log("val="+vSel.join(";") + " poped - "+ selOne);
  }

  transform();
	
	function transform() {
		//add a unique name to the extension in order to prevent conflicts with other extensions.
		//basically, take the object ID and add it to a DIV
		var divName = _this.Layout.ObjectId.replace("\\", "_");
		if(_this.Element.children.length == 0) {//if this div doesn't already exist, create a unique div with the divName
			var ui = document.createElement("div");
			ui.setAttribute("id", divName);
			_this.Element.appendChild(ui);
		} else {
			//if it does exist, empty the div so we can fill it again
			$("#" + divName).empty();
		}
		//var nCol = _this.Data.HeaderRows[0].length;
		
		var divMain = d3.select("#" + divName).append("table");
		divMain.append("thead");
		divMain.append("tbody");
		divMain.select("tbody").selectAll("tr").remove();

		var Rows =_this.Data.Rows;
		// Header
		var th = divMain.select("thead").selectAll("th")
			.data(['id','val'])
			.enter().append("th")
			.text(function(d) { return d; });
		// Rows
		var tr = divMain.select("tbody").selectAll("tr")
			.data(Rows)
			.enter().append("tr")
			.attr('name',function(d,i) { return i});			

		// Cells
		var td = tr.selectAll("td")
			.data(function(d) { 
				return d; 
			})
			.enter().append("td")
			.text(function(d) {
				return d.text; 
			})
			.attr('class','myTableR')
			.attr('name',function(d,i) { return i})
			.on('click',function(){
				var i=$(this).parent().attr("name");
				var ii=$(this).attr("name");
					console.log("i="+i+" ("+_this.Data.Rows [i][ii].text+")"); 
				//_this.Data.SelectRow(i);
				if (ii<nDimensions) {
					_this.Data.SelectTextsInColumn(ii, true, _this.Data.Rows [i][ii].text);
					console.log("selection done"); 
				} else {	
					var vSelVar="";
					for (var ki=nDimensions-1; ki>=0; ki--) {
						//vSelVar += ki+"="+_this.Data.Rows [i][ki].text+"; "
						vSelVar += _this.Data.Rows [i][ki].text+";"
					}	
					qvDoc.SetVariable("vSelectNow", vSelVar);
				}	
			})
			.on('mouseover',toggleM)
			.on('mouseout' ,toggleM);
		console.log("table loaded"); 
	}
	
	function toggleM(){
		$(this).toggleClass('stripes');
		$(this).siblings().toggleClass('stripes');
	}
	
 
 },true); //AddExtension
}