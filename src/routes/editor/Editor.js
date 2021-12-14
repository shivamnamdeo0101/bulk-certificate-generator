import React ,{useState}from 'react';
import "./editor.css";

import cert from "../../assets/cert.png";
import download from "../../assets/download.png";
import temp from "../../assets/temp.png";
import sheet from "../../assets/sheet.png";
import edit from "../../assets/edit.png";
import email from "../../assets/email.png";




import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import xlsx from "xlsx";


function Editor() {

	const [tmp_id, set_tmp_id] = useState("1");
	const [menu, set_menu] = useState("temp");
	const [loading, set_loading] = useState(false);
	const [stu_list, set_stu_list] = useState([]);
	const [sign, set_sign] = useState("./sign.PNG");
	const [name, set_name] = useState("Student Name");

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


	function onImage (event){
		 if (event.target.files && event.target.files[0]) {
		   set_sign(URL.createObjectURL(event.target.files[0]));
		 }
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

	const Download = async ()=>{

		
			for(var i=0;i<stu_list.length;i++){
				await PrintPdf(stu_list[i].f_name + " " + stu_list[i].l_name);
			}
		
		
	
	}

	return (
		<div className="editor">
				
			<div className="editor_head">
				<img src={cert} alt="" />
				<h2>Bulk Certificate Generator</h2>
				<img src={download} alt="" onClick={()=>Download()} />
			</div>

			<div className="editor_grid">

				<div className="left_div_icon_list">	

					<img src={temp} alt="" onClick={()=>set_menu("temp")} />
					<img src={sheet} alt="" onClick={()=>set_menu("sheet")}/>
					<img src={edit} alt="" onClick={()=>set_menu("edit")}/>
					<img src={email} alt="" onClick={()=>set_menu("email")}/>

				</div>

				{
					menu == "temp" &&
					<div className="middle_div_icon_list">	

						<img onClick={()=>set_tmp_id("1")} className={tmp_id == 1 ? "border_blue" : "border_black"} src="https://static.vecteezy.com/system/resources/previews/003/144/724/non_2x/creative-modern-certificate-template-design-free-vector.jpg" alt=""/>
						<img onClick={()=>set_tmp_id("2")} className={tmp_id == 2 ? "border_blue" : "border_black"}src="https://www.creativefabrica.com/wp-content/uploads/2020/07/04/Modern-certificate-of-appreciation-Graphics-4542129-1-1-580x387.jpg" alt=""/>
						<img onClick={()=>set_tmp_id("3")} className={tmp_id == 3 ? "border_blue" : "border_black"}src="https://image.freepik.com/free-vector/gradient-modern-certificate-template_52683-65506.jpg" alt="" />
						<img onClick={()=>set_tmp_id("4")} className={tmp_id == 4 ? "border_blue" : "border_black"}src="https://image.freepik.com/free-vector/gradient-modern-certificate-template_52683-65506.jpg" alt="" />
					</div>
				}
				{
					menu == "edit" &&
					<div className="middle_div_icon_list">	
						<div className="input_comp">
							<label>Certificate Heading 1</label>
							<input type="text" placeholder="Certificate Headings" name="heading1" value={data.heading1} onChange={handleChange} />
						</div>
						<div className="input_comp">
							<label>Certificate Heading 2</label>
							<input type="text" placeholder="Certificate Headings" name="heading2" value={data.heading2}onChange={handleChange} />
						</div>
						<div className="input_comp">
							<label>Certificate Sub Heading</label>
							<input type="text" placeholder="Certificate Headings" name="subheading" value={data.subheading}onChange={handleChange} />
						</div>
						<div className="input_comp">
							<label>Head Name</label>
							<input type="text" placeholder="Head Name" name="head_name" value={data.head_name}onChange={handleChange} />
						</div>
						<div className="input_comp upload_input">
							<label for="sign_img">Select Sign of The Head :</label>
							<input type="file" id="sign_img" accept="image/*" onChange={onImage} className="filetype" id="group_image"/>
					  	</div>

					</div>
				}


				{
					menu == "sheet" &&
					<div className="middle_div_icon_list">	

						<div className="input_comp upload_input">	
							<label for="upload">Select Excel File:</label>
					    	<input type="file" name="upload" id="accept"accept="xlsx/*" onChange={readUploadFile} />
						</div>	

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
				}

				

				<div className="editor_white_board">
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
				</div>

			</div>
			
			

		</div>
	)
}

export default Editor