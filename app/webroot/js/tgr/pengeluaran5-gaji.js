/* GAJI */
var  urlgajimaster=HOST_PATH+'/gaji/getall'; 
var urladdgajimaster=HOST_PATH+'/gaji/add';
var urlgetdpadetailbyun=HOST_PATH+'/dpa/readdetailbyun';
var urlgetpotongan=HOST_PATH+'/lain/getpotongan'; 
var urlgetpajak=HOST_PATH+'/lain/getpajak'; 

var detailPotongan4Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpotongan
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'ptg_kode',
    fields : [
        	{name: 'ptg_kode'},
	      	{name: 'ptg_nama'} 
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new GajiDetail2Store.recordType({
					gd_id: 0,
					gm_id: '',
				  
					ptg_kode:recordlist[i].get('ptg_kode'),
					 
					gd_nilai:0
				 
			
			});
		 	//alert("add to 2");
			GajiDetail2Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});

var detailPajak4Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpajak
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'pjk_kode',
    fields : [
        	{name: 'pjk_kode'},
	 
	{name: 'pjk_nama'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new GajiDetail3Store.recordType({
					gd_id: 0,
					gm_id: '',
				 	 
					pjk_kode:recordlist[i].get('pjk_kode'),
					 
					gd_nilai:0
				 
			
			});
		 
			GajiDetail3Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});

var detailDPABTL1Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetdpadetailbyun
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'dpad_id',
    fields : [
        	{name: 'dpad_id'},
	{name: 'dpam_no'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'nilaiangg'} ,
	{name: 'nilaitersedia'},
	{name: 'nilaiakum'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
    		for (i=0;i<recordlist.length;i++){
    		abc = new GajiDetail1Store.recordType({
					gd_id: 0,
					gm_id: '',
					 
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					gd_nilai:0 
			
			});
		 
			GajiDetail1Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    	 
    	}
    }
    
});
var GajiMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'gajimasters',
	totalProperty: 'total',
    idProperty: 'GajiMasterList.gm_id',
	fields: [
		{name:'GajiMasterList.gm_id'},
	 
		 
		{name:'data[GajiMaster][gm_id]',mapping:'GajiMasterList.gm_id'},
		{name:'data[GajiMaster][gm_no]',mapping:'GajiMasterList.gm_no'},
		{name:'data[GajiMaster][gm_tgl]',mapping:'GajiMasterList.gm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[GajiMaster][un_id]',mapping:'GajiMasterList.un_id'},
		{name:'data[GajiMaster][un_kode]',mapping:'GajiMasterList.un_kode'},
		{name:'data[GajiMaster][un_nama]',mapping:'GajiMasterList.un_nama'},
		 
		{name:'data[GajiMaster][gm_bulan]',mapping:'GajiMasterList.gm_bulan'},
		{name:'data[GajiMaster][gm_tahun]',mapping:'GajiMasterList.gm_tahun'},
		{name:'data[GajiMaster][gm_kotor]',mapping:'GajiMasterList.gm_kotor'},
		{name:'data[GajiMaster][gm_potongan]',mapping:'GajiMasterList.gm_potongan'},
		{name:'data[GajiMaster][gm_bersih]',mapping:'GajiMasterList.gm_bersih'},
		{name:'data[GajiMaster][gm_bulat]',mapping:'GajiMasterList.gm_bulat'} 
		 
	]
	 
	 
});
function hitungTotalGaji(){
	totkotor=0;totpotongan=0;totbersih=0;totbulat=0;
	for (i=0;i<GajiDetail1Store.getCount();i++){
	 if (GajiDetail1Store.getAt(i).get('gd_nilai')>0)
	 totkotor=totkotor+parseFloat(GajiDetail1Store.getAt(i).get('gd_nilai'));
	}
	 for (i=0;i<GajiDetail2Store.getCount();i++){
	 if (GajiDetail2Store.getAt(i).get('gd_nilai')>0)
	 totpotongan=totpotongan+parseFloat(GajiDetail2Store.getAt(i).get('gd_nilai'));
	}
	  
	 totbersih=totkotor-totpotongan;
	 totbulat=totbersih;
	 Ext.getCmp('gm_kotor1').setValue(totkotor);
	 Ext.getCmp('gm_potongan1').setValue(totpotongan);
	 Ext.getCmp('gm_bersih1').setValue(totbersih);
	 Ext.getCmp('gm_bulat1').setValue(totbulat);
	
}
function proc_gaji3(o){
	hitungTotalGaji();
}
function proc_gaji2(o){ 
	hitungTotalGaji();
}
function proc_gaji1(o){ 
	if (o.field=="akun_kode"){
		var idxRec=-1;
		idxRec=dpaBTLByUNSearchStore.findBy(function(record, id){
			  	 
		        if(record.get('akun_kode') === o.value  ) {
				   		 
		              return true;  // a record with this data exists
		        }
		        return false;  // there is no record in the store with this data
		    	},dpaBTLByUNSearchStore,0);
			//alert("idxRec"+idxRec);
			//alert(accountActiveComboStore.getAt(idxRec).get("acc_name"));
			o.record.set("akun_nama",dpaBTLByUNSearchStore.getAt(idxRec).get("akun_nama"));
			 

	}
	hitungTotalGaji();
}
var GajiMasterStore = new Ext.data.GroupingStore({
  	reader:GajiMasterJsonReader,
	groupField:'data[GajiMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlgajimaster
    })
});



var gajiDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/gaji/readdetail_1',
        create : HOST_PATH+'/gaji/createdetail_1',
        update:  HOST_PATH+'/gaji/updatedetail_1',
        destroy:  HOST_PATH+'/gaji/destroydetail_1'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Daftar Gaji : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Daftar Gaji  :"+action+":"+res.message);
			},
		exception : function(proxy, type, action, options, res) {
			if (type === 'remote') {
			Ext.Msg.show({
				title: 'REMOTE EXCEPTION',
				msg: res.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			}
			}
	}
});
var gajiDetail1_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'gd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'gd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'gm_id'},
	 {name: 'gd_nilai',type:'float'} 
	 
]); 

// The new DataWriter component.
var gajiDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var GajiDetail1Store = new Ext.data.Store({
    id: 'GajiDetail1Store',
    proxy: gajiDetail1_proxy,
    reader: gajiDetail1_reader,
    writer: gajiDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var GajiDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	this.tbar = this.buildTopToolbar();
    GajiDetail1Grid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
      return {
			plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>T</u>ambah',
				iconCls: 'add',
				 keyBinding: {
                            key: 't',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>H</u>apus',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'h',
                            alt: true
                        }
			}, '-']
		}
    },
	onAdd: function(btn, ev) {
		 
		var rec = this.store.getAt(0);
		var acontinue=false;
		// alert(rec);
		//check cust_code1 first
		
		if (rec){
			aakun_kode=rec.get("akun_kode");
		 
			if (aakun_kode.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
	 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				gd_id: 0,
				gm_id: '',
				 
				 
				akun_kode:'',
				akun_nama:'',
				gd_nilai:0 
				 
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
			 
		}
		else {
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
		}
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		 
        this.store.remove(index);
		hitungTotalGaji();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_gaji1(o);
		}
		 
	}
});



var gajiDetail2_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/gaji/readdetail_2',
        create : HOST_PATH+'/gaji/createdetail_2',
        update:  HOST_PATH+'/gaji/updatedetail_2',
        destroy:  HOST_PATH+'/gaji/destroydetail_2'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Daftar Gaji : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Daftar Gaji  :"+action+":"+res.message);
			},
		exception : function(proxy, type, action, options, res) {
			if (type === 'remote') {
			Ext.Msg.show({
				title: 'REMOTE EXCEPTION',
				msg: res.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			}
			}
	}
});
var gajiDetail2_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'gd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'gd_id'},
	{name: 'ptg_kode'},
	{name: 'gm_id'},
	{name: 'gd_nilai',type:'float'} 
	 
]); 

// The new DataWriter component.
var gajiDetail2_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var GajiDetail2Store = new Ext.data.Store({
    id: 'GajiDetail2Store',
    proxy: gajiDetail2_proxy,
    reader: gajiDetail2_reader,
    writer: gajiDetail2_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var GajiDetail2Grid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    GajiDetail2Grid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
      return {
			plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>T</u>ambah',
				iconCls: 'add',
				 keyBinding: {
                            key: 't',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>H</u>apus',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'h',
                            alt: true
                        }
			}, '-']
		}
    },
	onAdd: function(btn, ev) {
		 
		var rec = this.store.getAt(0);
		var acontinue=false;
		// alert(rec);
		//check cust_code1 first
		
		if (rec){
			adpam_no=rec.get("dpam_no");
		 
			if (adpam_no.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
	 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				gd_id: 0,
				gm_id: '',
				ptg_kode:'',
			 
				gd_nilai:0
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
			 
		}
		else {
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
		}
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		 
        this.store.remove(index);
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_gaji2(o);
		}
		 
	}
});


var gajiDetail3_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/gaji/readdetail_3',
        create : HOST_PATH+'/gaji/createdetail_3',
        update:  HOST_PATH+'/gaji/updatedetail_3',
        destroy:  HOST_PATH+'/gaji/destroydetail_3'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Daftar Gaji : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Daftar Gaji  :"+action+":"+res.message);
			},
		exception : function(proxy, type, action, options, res) {
			if (type === 'remote') {
			Ext.Msg.show({
				title: 'REMOTE EXCEPTION',
				msg: res.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			}
			}
	}
});
var gajiDetail3_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'gd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'gd_id'},
	{name: 'gm_id'},
	{name: 'pjk_kode'},
	 
	{name: 'gd_nilai',type:'float'} 
	 
]); 

// The new DataWriter component.
var gajiDetail3_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var GajiDetail3Store = new Ext.data.Store({
    id: 'GajiDetail3Store',
    proxy: gajiDetail3_proxy,
    reader: gajiDetail3_reader,
    writer: gajiDetail3_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var GajiDetail3Grid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    GajiDetail3Grid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
      return {
			plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>T</u>ambah',
				iconCls: 'add',
				 keyBinding: {
                            key: 't',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>H</u>apus',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'h',
                            alt: true
                        }
			}, '-']
		}
    },
	onAdd: function(btn, ev) {
		 
		var rec = this.store.getAt(0);
		var acontinue=false;
		// alert(rec);
		//check cust_code1 first
		
		if (rec){
			adpam_no=rec.get("dpam_no");
		 
			if (adpam_no.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
	 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				gd_id: 0,
				gm_id: '',
				pjk_kode:'',
			 
				gd_nilai:0
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
			 
		}
		else {
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
		}
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		 
        this.store.remove(index);
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_gaji3(o);
		}
		 
	}
});

 
 
MyDesktop.GajiGridWindow = Ext.extend(Ext.app.Module, {
    id:'gajigrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Gaji',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
     },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win2 = desktop.getWindow(this.id);
		
        if(!win2){
            win2 = desktop.createWindow({
                id: this.id,
                title:'Daftar Gaji',
                width:700,
                height:400,
                iconCls: 'icon-grid',
                 shim:false,
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
                layout: 'fit', 
				border:false,
                items: 
					gridgaji = new Ext.grid.GridPanel({
							id: 'gridgaji',
						 
							 store: GajiMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[GajiMaster][gm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[GajiMaster][gm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[GajiMaster][un_nama]',
								width: 150,
								sortable: true
							},
							{
								header: "Bulan",
								dataIndex: 'data[GajiMaster][gm_bulan]',
								width: 50,
								sortable: true
							},
							{
								header: "Tahun",
								dataIndex: 'data[GajiMaster][gm_tahun]',
								width: 50,
								sortable: true
							},
							 
							{
								header: "Nilai Kotor",
								dataIndex: 'data[GajiMaster][gm_kotor]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Nilai Potongan",
								dataIndex: 'data[GajiMaster][gm_potongan]',
								width: 120,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	{
								header: "Nilai Bersih",
								dataIndex: 'data[GajiMaster][gm_bersih]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							
							},
							{
								header: "Nilai Pembulatan",
								dataIndex: 'data[GajiMaster][gm_sisa]',
								width: 80,
								align: 'right',
							 	renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	}  
							  
							],
							
							  view: new Ext.grid.GroupingView({
								 
								groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
							}),
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
									selectionchange: function(sm){
										if (sm.getCount()) {
											 
												Ext.getCmp('editgajibutt').enable();
											 
											 Ext.getCmp('delgajibutt').enable();
										 }
										else {
										 	Ext.getCmp('delgajibutt').disable();
										 	Ext.getCmp('editgajibutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: GajiMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 GajiMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchGajiTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar Gaji',
								iconCls: 'gaji',
								ref: '../gajiButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrygaji-win').createWindow();
											 entrygajiform.getForm().reset();
									 			 
									 			GajiDetail2Store.load({
									 				params: {
									 					gm_id: 0
									 				}
									 			});
												GajiDetail1Store.load({
									 				params: {
									 					gm_id: 0
									 				}
									 			});
									 			GajiDetail3Store.load({
									 				params: {
									 					gm_id: 0
									 				}
									 			});
									 			Ext.getCmp('gm_tgl1').setValue(new Date());
												Ext.getCmp('gm_tgl1').setReadOnly(false);
												Ext.getCmp('gm_id1').setValue(0);
											 
												Ext.getCmp('gaji_un_id1').enable();
															 
										}
									   } , {
										id: 'editgajibutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridgaji.getSelectionModel().getSelected().get("GajiMasterList.gm_id");
										 	 GajiDetail1Store.load({params:{gm_id:mid}});				 
											 GajiDetail2Store.load({params:{gm_id:mid}});
											 GajiDetail3Store.load({params:{gm_id:mid}});
											 MyDesktop.getSingleModule('entrygaji-win').createWindow();
											 Ext.getCmp("entrygajiform").getForm().loadRecord(gridgaji.getSelectionModel().getSelected());
										}
									},{
											id: 'delgajibutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridgaji.getSelectionModel().getSelected().get('GajiMasterList.gm_id');
												
												Ext.MessageBox.show({
										           title:'Delete Record?',
										           msg: 'Are you sure you want to delete selected record?',
										           buttons: Ext.MessageBox.YESNO,
										           fn: showResult,
										          
										           icon: Ext.MessageBox.QUESTION
										        });
												 function showResult(btn){
											       if (btn == 'yes') {
													   	 Ext.MessageBox.show({
												           msg: 'Request delete record #'+aid+'...',
												           progressText: 'Process...',
												           width:300,
												           wait:true,
												           waitConfig: {interval:200},
												           icon:'ext-mb-download', //custom class in msg-box.html
												           animEl: 'mb7'
												       });
						
														 Ext.Ajax.request({
													        url:urldelgajimaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	GajiMasterStore.reload();
															},
															failure: function ( result, request) { 
																 Ext.MessageBox.hide();
						
																Ext.MessageBox.alert('Failed', result.responseText); 
															} 
						
													    });
												   }
											    }; 
											}
										}   ]
								
								
								}
							
							}, '-',
							 'Search Key',
							 new Ext.form.TextField({
									id:'searchGajiTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                GajiMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchGajiTxt").getValue()
											 }})
						       
						                }
						              }
						            }
									
							 }),' ',
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								  GajiMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchGajiTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		GajiMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridgaji.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridgaji.getSelectionModel().getSelected().get("GajiMasterList.gm_id");
		   
			 GajiDetail2Store.load({params:{gm_id:mid}});
			 GajiDetail1Store.load({params:{gm_id:mid}});
			 GajiDetail3Store.load({params:{gm_id:mid}});
			 MyDesktop.getSingleModule('entrygaji-win').createWindow();
			 Ext.getCmp("entrygajiform").getForm().loadRecord(gridgaji.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryGajiForm = Ext.extend(Ext.app.Module, {
    id:'entrygaji-win',
	title:'Daftar Gaji',
	init : function(){
      this.launcher = {
            text: this.title,
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },
	closeWindow:function(){
	     if(win7){
			win7.close();
		}
	},
    createWindow : function(){
       var desktop=this.app.getDesktop();
	  
	   win7=desktop.getWindow(this.id);
        if(!win7){
            win7 = desktop.createWindow({
                id: this.id,
                title:this.title,
                width:800,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrygajiform = new Ext.FormPanel({
						id:'entrygajiform',
				      	 layout: 'border',
						defaults: {
							split: true 
						},
						
				      	frame:true,
				       	autoScroll :true,
				        border:false,
				        bodyStyle:'padding:5px 5px 0',
				      	 
						 autoWidth:true,
						 height:400,
						items: [
								{	region:'north', 
									layout:'column',
									bodyStyle:'padding:5px 5px 0 0',
									border: false,
									columns:2,
									defaults: {
										
										border: false,
										align:'left'
									},       
									 	autoHeight:true,   
									items: [{
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 	columnWidth:'.4',
											items:[  
											{	 xtype:'hidden',
												 name: 'data[GajiMaster][gm_id]',
												 
												id:'gm_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[GajiMaster][gm_no]',
												maxLength:20,
												id:'gm_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'gm_tgl1',
												name: 'data[GajiMaster][gm_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											}  
											,{	 xtype:'numberfield',
												fieldLabel: 'Gaji Bulan #',
												name: 'data[GajiMaster][gm_bulan]',
												maxLength:20,
												id:'gm_bulan1',
												 
												allowBlank:false 
												 
											} 
										]
									},
									{
										layout: 'form',
										border:false,
										defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
										columnWidth:'.6', 
										items:[ 
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'SKPD',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'gaji_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[GajiMaster][un_id]',
															 fieldLabel:'SKPD',
															 displayField:'un_kode',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'un_id',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:skpdComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-skpd',
															 listeners: {
							  										select: function(thiscombo,record, index){
																		   Ext.getCmp('gaji_un_nama1').setValue(record.get('un_nama'));
																	 
																		 detailDPABTL1Store.load({
																	 				params: {
																	 					un_id: record.get('un_id')
																	 				}
																	 			});
																	    dpaBTLByUNSearchStore.baseParams={un_id:record.get('un_id')};
									    	  							 dpaBTLByUNSearchStore.removeAll();
											 							 dpaBTLByUNSearchStore.lastQuery=null;
											 							 
											 							 GajiDetail2Store.removeAll();
																		
																		 GajiDetail3Store.removeAll();
																		 detailPotongan4Store.load();
																		 detailPajak4Store.load();
							  											
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'gaji_un_nama1',
														fieldLabel: '',
														name: 'data[GajiMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											
										]
									} 
									]
								}//end of top form
								,
								{
									 
									layout: 'fit',
									border: true,
									frame:false,
									region: 'center',
									items:  tabPanelGaji= new Ext.TabPanel({
													 
													id:'tabPanelGaji',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabgaji2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Gaji',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    gajiDetail1Grid = new GajiDetail1Grid({
																				id: 'gajiDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: GajiDetail1Store,
																				
																				columns: [{
																					header: "Kode Rekening",
																					dataIndex: 'akun_kode',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						 store: dpaBTLByUNSearchStore,
																						//store:dpaBTLSearchStore,
																						displayField: 'akun_kode',
																						typeAhead: false,
																					 
																						valueField: 'akun_kode',
																						loadingText: 'Searching...',
																						minChars: 2,
																						triggerAction:'query',
																						pageSize: 10,
																						boxMinWidth: 250,
																						boxMinHeight: 100,
																						height:100,
																						hideTrigger: false,
																						// forceSelection: true,
																						tpl: dpaBTLComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-dpabtl',
																						listeners : {
																							focus : function(){
																							  dpaBTLByUNSearchStore.baseParams={un_id:Ext.getCmp('gaji_un_id1').getValue()};
																							}
																						}
																					
																					},
																					isCellEditable: true
																				}, {
																					header: "Uraian",
																					width: 200,
																					sortable: true,
																					dataIndex: 'akun_nama'
																				},   {
																					header: "Nilai",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'gd_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'gd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid
																					                        		
											                       
																	
									                        
														   },
									                        {id:'tabgaji3',
									                        layout:'fit',
									                        title: 'Potongan',
									                        items:gajiDetail2Grid = new GajiDetail2Grid({
																				id: 'gajiDetail2Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: GajiDetail2Store,
																				
																				columns: [ 
																				{
																					header: "Potongan",
																					width: 150,
																					sortable: true,
																					isCellEditable: true,
																					allowBlank: false,
																					 
																					dataIndex: 'ptg_kode'
																				},  
																				{
																					header: "Nilai",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'gd_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				 {
																					header: "ID",
																					hidden:false,
																					width: 40,
																					sortable: true,
																					dataIndex: 'gd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid  
									                        } ,
									                        {id:'tabgaji4',
									                        layout:'fit',
									                        title: 'Pajak',
									                        items:gajiDetail3Grid = new GajiDetail3Grid({
																				id: 'gajiDetail3Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: GajiDetail3Store,
																				
																				columns: [ 
																				{
																					header: "Pajak",
																					width: 150,
																					sortable: true,
																					isCellEditable: true,
																					allowBlank: false,
																					 
																					dataIndex: 'pjk_kode'
																				},  
																				{
																					header: "Nilai",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'gd_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				 {
																					header: "ID",
																					hidden:false,
																					width: 40,
																					sortable: true,
																					dataIndex: 'gd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid  
									                        } 
									                  ]
												})//end of tab
											 
									 
										 
								},//end of center
								{	//bottom form
									region:'south', 
									layout:'column',
									bodyStyle:'padding:5px 5px 0',
									border: false,
									columns:2,
									defaults: {
										columnWidth: '.5',
										border: false,
										align:'right'
									},       
									 width: 300,	height:85,   
									items: [
										{
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 
											items:[  
											   
										  	 {
											 	xtype:'numberfield',
												fieldLabel:'Total Kotor',
												name:'data[GajiMaster][gm_kotor]',
												id:'gm_kotor1',
												
												value:'0',
												fieldClass:'numberfield',
												decimalPrecision:2,
												listeners : {
													change: function(){
														 hitungTotalSales();
													}
												}
											 } 
											 
										]
									},
										{
											 defaults:{ layout:'form',anchor:'90%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 
											items:[  
											  {
											 	xtype:'numberfield',
												fieldLabel:'Total Potongan',
												name:'data[GajiMaster][gm_potongan]',
												id:'gm_potongan1',
												value:'0',
												readOnly:true,
												fieldClass:'numberfield',
												decimalPrecision:2
											 } 
										]
									},{
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 
											items:[  
											{
											 	xtype:'numberfield',
												fieldLabel:'Total Bersih',
												name:'data[GajiMaster][gm_bersih]',
												id:'gm_bersih1',
												value:'0',
												 
												fieldClass:'numberfield',
												decimalPrecision:2,
												listeners : {
													change: function(){
														hitungTotalSales();
													}
												}
											 }  
										]
									},
									{
										layout: 'form',
										border:false,
										defaults:{ layout:'form',anchor:'90%',  autoHeight:false},
										items:[ 
											
											 
											 {
											 	xtype:'numberfield',
												fieldLabel:'Total Pembulatan',
												name:'data[GajiMaster][gm_bulat]',
												id:'gm_bulat1',
												value:'0',
												readOnly:true,
												fieldClass:'numberfield',
												decimalPrecision:2
											 } 
										]
									}
									]
								}//end of bottom form
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'gaji3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrygajiform.getForm().reset();
						 		 
						 			
									GajiDetail1Store.load({
						 				params: {
						 					gm_id: 0
						 				}
						 			});
						 			GajiDetail2Store.load({
						 				params: {
						 					gm_id: 0
						 				}
						 			});
						 			GajiDetail3Store.load({
						 				params: {
						 					gm_id: 0
						 				}
						 			});
						 			Ext.getCmp('gm_tgl1').setValue(new Date());
									Ext.getCmp('gm_tgl1').setReadOnly(false);
									Ext.getCmp('gm_id1').setValue(0);
								 
									Ext.getCmp('gaji_un_id1').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_gaji',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('gm_id1').getValue();
											aurl=HOST_PATH+'/rptgaji/gaji/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'gaji3-save',
								 
						 		handler: function(){
									hitungTotalGaji();
						 			if (entrygajiform.getForm().isValid()) {
						 				entrygajiform.getForm().submit({
						 					url: urladdgajimaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('gm_no1').setValue(newno);
														Ext.getCmp('gm_id1').setValue(newid)
														Ext.getCmp('gm_no1').setReadOnly(true);
														GajiDetail2Store.setBaseParam('master', newid);
														GajiDetail1Store.setBaseParam('master', newid);
														GajiDetail3Store.setBaseParam('master', newid);
														
														GajiDetail1Store.save();
														GajiDetail2Store.save();
														GajiDetail3Store.save();
														Ext.getCmp('gm_id1').setValue(newid);
														 
														
													}
													
												},
												failure: function(form, action){
													if (action.failureType === Ext.form.Action.CONNECT_FAILURE) {
														Ext.Msg.alert('Error', 'Status:' + action.response.status + ': ' +
														action.response.statusText);
													}
													if (action.failureType === Ext.form.Action.SERVER_INVALID) {
													
														Ext.Msg.alert('Invalid', action.result.msg);
													}
												}
											});
										}
										else {
											Ext.MessageBox.alert('Input Validation Error', 'Please check your input, thank you');
										}
									}
								}, {
									text: 'Cancel',
									id:'gaji3-cancel',
									 
									margins:'0',
									handler: function(){
										GajiMasterStore.reload();
										MyDesktop.getSingleModule('entrygaji-win').closeWindow();
										
										
									}
									
								}]
							}
		   		 }) //end of top panel
				 
				  
							 
				 ]// end of main item
                 
            });
        }
	
        win7.show();
		
		 
		
    }
});