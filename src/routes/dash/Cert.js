import React,{useState,useEffect} from 'react'
import "./dash.css";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import xlsx from "xlsx";

function Cert() {

	const [sign, set_sign] = useState("./sign.PNG");
	const [name, set_name] = useState("Student Name");
	const [loading, set_loading] = useState(false);
	const [stu_list, set_stu_list] = useState([]);



	
	const [data, set_data] = useState({
				"heading1":"Conversion XL",
				"heading2":"This is certify that",
				"name":"Test Name",
				"subheading":"has successfully completed Google Analytics Course on March 8th 2022",
				"head_name":"Sundar Pichai, Chief Executive Officer of Alphabet"

	});
	
	function handleChange(evt) {
  		const value =
    		evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  		set_data({
    		...data,
    		[evt.target.name]: value
  		});
	}

	const readUploadFile = async (e) => {
	    e.preventDefault();
	    if (e.target.files) {
	        const reader = new FileReader();
	        reader.onload = (e) => {
	            const data = e.target.result;
	            const workbook = xlsx.read(data, { type: "array" });
	            const sheetName = workbook.SheetNames[0];
	            const worksheet = workbook.Sheets[sheetName];
	            const json = xlsx.utils.sheet_to_json(worksheet);
	            set_stu_list(json);
	           	
	            console.log(stu_list)

	        };
	        reader.readAsArrayBuffer(e.target.files[0]);
	    }
	}



	function onImage (event){
		 if (event.target.files && event.target.files[0]) {
		   set_sign(URL.createObjectURL(event.target.files[0]));
		 }
	}

	const PrintPdf = async (name) => {
		await set_name(name)
	  	const divToDisplay = document.getElementById('content')
	  	console.log(divToDisplay);
		 html2canvas(divToDisplay,{dpi:2000}).then(function(canvas) {
		    const imgData = canvas.toDataURL("image/png");
		    const pdf = new jsPDF({
	          orientation: 'landscape',
	        });
	        const imgProps= pdf.getImageProperties(imgData);
	        const pdfWidth = pdf.internal.pageSize.getWidth();
	        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
	        pdf.save(name+'_certificate.pdf');
		})
	}

	const temp = async ()=>{

		
			for(var i=0;i<stu_list.length;i++){
				await PrintPdf(stu_list[i].f_name + " " + stu_list[i].l_name);
			}
		
		
	
	}


	if(loading){
		return(
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	return (

		<div className="dashboard">
			<h2>Bulk Certificate Generator</h2>
			<div  className="dash">
				<div className="cert_flex">

				<div className="certificate" id="content">
					
					<div className="cert_head">
						<h2>{data.heading1}</h2>
						<h1>Certificate Of Completion</h1>

					</div>

					<div className="cert_main">
						<p>{data.heading2}</p>
						<h2>{name}</h2>
						<p>{data.subheading} </p>
						
					</div>

					<div className="cert_sign">
						<img src={sign} alt="" />
						<p>{data.head_name}</p>
					</div>

					
				</div>

				<button onClick={()=>temp()}>Download All In One Click</button>

			</div>
			<div className="temp_grid">
				<input type="text" placeholder="Certificate Headings" name="heading1" value={data.heading1} onChange={handleChange} />
				<input type="text" placeholder="Certificate Headings" name="heading2" value={data.heading2}onChange={handleChange} />
				<input type="text" placeholder="Certificate Headings" name="subheading" value={data.subheading}onChange={handleChange} />
				<input type="text" placeholder="Head Name" name="head_name" value={data.head_name}onChange={handleChange} />
				
				<label for="sign_img">Select Sign of Head :</label>
				<input type="file" id="sign_img" accept="image/*" onChange={onImage} className="filetype" id="group_image"/>
			    
			    <label for="upload">Select Excel File:</label>
			    <input
			        type="file"
			        name="upload"
			        id="upload"
			        accept="xlsx/*"
			        onChange={readUploadFile}
			    />

			    <div className="stu_list">
			    	{
			    		stu_list.map((item,index)=>(
			    			<div className="stu_list_comp" key={index}>
			    				<p>{index+1}</p>
			    				<p>First Name : {item.f_name}</p>
			    				<p>Last Name : {item.l_name}</p>
			    				<p>Email : {item.email}</p>
			    			</div>
			    		))
			    	}
			    	
			    </div>
				
			</div>


			</div>


		</div>

		


	)
}

export default Cert