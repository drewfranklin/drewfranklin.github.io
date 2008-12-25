function GridCalculator()
{
	gridCalculatorObj = this;
	
	this.attachEvents();
}

GridCalculator.prototype.attachEvents = function ()
{
	$(':input').keyup(function(event)
	{
		gridCalculatorObj.updateCode();
	});

	$(':input').change(function(event)
	{
		gridCalculatorObj.updateCode();
	});
};

GridCalculator.prototype.updateCode = function ()
{
	output = '&lt;div id=&quot;GridLayout&quot;&gt;\n';
	output += '    &lt;div id=&quot;GridLayout-params&quot;&gt;\n';
	output += '        {\n';
	output += '            column_width:'+$('#columnwidth').val()+',\n';
    output += '            column_count:'+$('#columns').val()+',\n';
    output += '            subcolumn_count:'+$('#subcolumns').val()+',\n';
    output += '            column_gutter:'+$('#gutter').val()+',\n';
    output += '            align:&apos;'+$('#align').val()+'&apos;';

	if ($('#layout').val() == 'fluid')
	{
		output += ',\n';
		output += '            percent:true,\n';
		output += '            width:'+$('#width').val()+',\n';
		output += '            min_width:'+$('#minwidth').val()+'';
		
		$('#disclaimer').show();
		$('#fluid_params').show();
		$('.metric').html('%');
		
		// percent:true,
		// width:80,
		// min_width:960

		gridLayout.grid_settings.width     = $('#width').val();
		gridLayout.grid_settings.min_width = $('#minwidth').val();
		gridLayout.grid_settings.percent   = true;
	}
	else
	{
		$('.metric').html('px');
		$('#fluid_params').hide();		
		$('#disclaimer').hide();
		
		delete gridLayout.grid_settings.width;
		delete gridLayout.grid_settings.min_width;
		delete gridLayout.grid_settings.percent;
	}
	

	output += '\n        }\n';
	output += '    &lt;/div&gt;\n';
	output += '&lt;/div&gt;';

	$('#gridlayout_code').html(output);
	
	// column_width:190,
	// column_count:2,
	// column_gutter:10,
	// subcolumn_count:2,
	// align:'center'
	
	gridLayout.grid_settings.column_width    = $('#columnwidth').val();
	gridLayout.grid_settings.column_count    = $('#columns').val();
	gridLayout.grid_settings.column_gutter   = $('#gutter').val();
	gridLayout.grid_settings.subcolumn_count = $('#subcolumns').val();
	gridLayout.grid_settings.align           = $('#align').val();
	
	gridLayout.calculateTotalWidth();
	gridLayout.calculateSubColumnWidth();
	// this.attachEvents();
	gridLayout.buildHTML();
	gridLayout.gridHeight();
	
	// alert(gridLayout.grid_settings.column_width);
	
};

$(document).ready(function()
{
	gridCalculator = new GridCalculator();
});