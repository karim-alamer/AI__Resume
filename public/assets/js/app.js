// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById("cv-form");
const validType = {
  TEXT: "text",
  TEXT_EMP: "text_emp",
  EMAIL: "email",
  DIGIT: "digit",
  PHONENO: "phoneno",
  ANY: "any",
};

// user inputs elements
let firstnameElem = mainForm.firstname,
  middlenameElem = mainForm.middlename,
  lastnameElem = mainForm.lastname,
  imageElem = mainForm.image,
  designationElem = mainForm.designation,
  addressElem = mainForm.address,
  emailElem = mainForm.email,
  phonenoElem = mainForm.phoneno,
  summaryElem = document.getElementsByClassName("summary_input")[0]
// display elements
let nameDsp = document.getElementById("fullname_dsp"),
  imageDsp = document.getElementById("image_dsp"),
  phonenoDsp = document.getElementById("phoneno_dsp"),
  emailDsp = document.getElementById("email_dsp"),
  addressDsp = document.getElementById("address_dsp"),
  designationDsp = document.getElementById("designation_dsp"),
  summaryDsp = document.getElementById("summary_dsp"),
  projectsDsp = document.getElementById("projects_dsp"),
  achievementsDsp = document.getElementById("achievements_dsp"),
  skillsDsp = document.getElementById("skills_dsp"),
  educationsDsp = document.getElementById("educations_dsp"),
  experiencesDsp = document.getElementById("experiences_dsp");

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
  let elemsAttrsCount = nodeLists.length;
  let elemsDataCount = nodeLists[0].length;
  let tempDataArr = [];

  // first loop deals with the no of repeaters value
  for (let i = 0; i < elemsDataCount; i++) {
    let dataObj = {}; // creating an empty object to fill the data
    // second loop fetches the data for each repeaters value or attributes
    for (let j = 0; j < elemsAttrsCount; j++) {
      // setting the key name for the object and fill it with data
      dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
    }
    tempDataArr.push(dataObj);
  }

  return tempDataArr;
};

const getUserInputs = () => {
  // achivements
  let achievementsTitleElem = document.querySelectorAll(".achieve_title"),
    achievementsDescriptionElem = document.querySelectorAll(
      ".achieve_description"
    );

  // experiences
  let expTitleElem = document.querySelectorAll(".exp_title"),
    expOrganizationElem = document.querySelectorAll(".exp_organization"),
    expLocationElem = document.querySelectorAll(".exp_location"),
    expStartDateElem = document.querySelectorAll(".exp_start_date"),
    expEndDateElem = document.querySelectorAll(".exp_end_date"),
    expDescriptionElem = document.querySelectorAll(".exp_description");

  // education
  let eduSchoolElem = document.querySelectorAll(".edu_school"),
    eduDegreeElem = document.querySelectorAll(".edu_degree"),
    eduCityElem = document.querySelectorAll(".edu_city"),
    eduStartDateElem = document.querySelectorAll(".edu_start_date"),
    eduGraduationDateElem = document.querySelectorAll(".edu_graduation_date"),
    eduDescriptionElem = document.querySelectorAll(".edu_description");

  let projTitleElem = document.querySelectorAll(".proj_title"),
    projLinkElem = document.querySelectorAll(".proj_link"),
    projDescriptionElem = document.querySelectorAll(".proj_description");

  let skillElem = document.querySelectorAll(".skill");

  // event listeners for form validation
  firstnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "First Name")
  );
  middlenameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT_EMP, "Middle Name")
  );
  lastnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "Last Name")
  );
  phonenoElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.PHONENO, "Phone Number")
  );
  emailElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.EMAIL, "Email")
  );
  addressElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.ANY, "Address")
  );
  designationElem.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "Designation")
  );

  achievementsTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  achievementsDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  expTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  expOrganizationElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Organization")
    )
  );
  expLocationElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Location")
    )
  );
  expStartDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "End Date")
    )
  );
  expEndDateElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "End Date")
    )
  );
  expDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  eduSchoolElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "School")
    )
  );
  eduDegreeElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Degree")
    )
  );
  eduCityElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "City")
    )
  );
  eduStartDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "Start Date")
    )
  );
  eduGraduationDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "Graduation Date")
    )
  );
  eduDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  projTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  projLinkElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Link")
    )
  );
  projDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  skillElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "skill")
    )
  );
  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(
      ["achieve_title", "achieve_description"],
      achievementsTitleElem,
      achievementsDescriptionElem
    ),
    experiences: fetchValues(
      [
        "exp_title",
        "exp_organization",
        "exp_location",
        "exp_start_date",
        "exp_end_date",
        "exp_description",
      ],
      expTitleElem,
      expOrganizationElem,
      expLocationElem,
      expStartDateElem,
      expEndDateElem,
      expDescriptionElem
    ),
    educations: fetchValues(
      [
        "edu_school",
        "edu_degree",
        "edu_city",
        "edu_start_date",
        "edu_graduation_date",
        "edu_description",
      ],
      eduSchoolElem,
      eduDegreeElem,
      eduCityElem,
      eduStartDateElem,
      eduGraduationDateElem,
      eduDescriptionElem
    ),
    projects: fetchValues(
      ["proj_title", "proj_link", "proj_description"],
      projTitleElem,
      projLinkElem,
      projDescriptionElem
    ),
    skills: fetchValues(["skill"], skillElem),
  };
};

function validateFormData(elem, elemType, elemName) {
  // checking for text string and non empty string
  if (elemType == validType.TEXT) {
    if (!strRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only text string
  if (elemType == validType.TEXT_EMP) {
    if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for email
  if (elemType == validType.EMAIL) {
    if (!emailRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for phone number
  if (elemType == validType.PHONENO) {
    if (!phoneRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only empty
  if (elemType == validType.ANY) {
    if (elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }
}

// adding the invalid text
function addErrMsg(formElem, formElemName) {
  formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text
function removeErrMsg(formElem) {
  formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
  listContainer.innerHTML = "";
  listData.forEach((listItem) => {
    let itemElem = document.createElement("div");
    itemElem.classList.add("preview-item");

    for (const key in listItem) {
      let subItemElem = document.createElement("span");
      subItemElem.classList.add("preview-item-val");
      subItemElem.innerHTML = `${listItem[key]}`;
      itemElem.appendChild(subItemElem);
    }

    listContainer.appendChild(itemElem);
  });
};

const displayCV = (userData) => {
  nameDsp.innerHTML =
    userData.firstname + " " + userData.middlename + " " + userData.lastname;
  phonenoDsp.innerHTML = userData.phoneno;
  emailDsp.innerHTML = userData.email;
  addressDsp.innerHTML = userData.address;
  designationDsp.innerHTML = userData.designation;
  summaryDsp.innerHTML = userData.summary;
  showListData(userData.projects, projectsDsp);
  showListData(userData.achievements, achievementsDsp);
  showListData(userData.skills, skillsDsp);
  showListData(userData.educations, educationsDsp);
  showListData(userData.experiences, experiencesDsp);
};

// generate CV
const generateCV = () => {
  let userData = getUserInputs();
  displayCV(userData);
  console.log(userData)
};

function previewImage() {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(imageElem.files[0]);
  oFReader.onload = function (ofEvent) {
    imageDsp.src = ofEvent.target.result;
  };
}
/*
// auto summary filling
const levenshteinDistance = (a, b) => {
    const matrix = [];
  
    // Create an empty matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
  
    // Fill the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // deletion
                    matrix[i - 1][j] + 1      // insertion
                );
            }
        }
    }
  
    return matrix[b.length][a.length];
};

const jobTitles = [
    {
        "title": "Software Engineer",
        "summary": "Develops, tests, and maintains software applications. Collaborates with cross-functional teams to design and implement innovative solutions."
    },
    {
        "title": "Data Scientist",
        "summary": "Analyzes and interprets complex data to inform business decisions. Uses statistical methods and machine learning techniques to build predictive models."
    },
    {
        "title": "Product Manager",
        "summary": "Oversees product development from concept to launch. Works closely with engineering, marketing, and sales teams to ensure product success."
    },
    {
        "title": "UX/UI Designer",
        "summary": "Designs user-friendly interfaces and enhances user experience for digital products. Conducts user research and testing to inform design decisions."
    },
    {
        "title": "Marketing Specialist",
        "summary": "Develops and implements marketing strategies to increase brand awareness and drive sales. Analyzes market trends and customer feedback."
    },
    {
        "title": "Network Administrator",
        "summary": "Manages and maintains network infrastructure. Ensures network security and performance while troubleshooting issues as they arise."
    },
    {
        "title": "Project Manager",
        "summary": "Leads project teams to deliver projects on time and within budget. Coordinates resources and communicates progress to stakeholders."
    },
    {
        "title": "Sales Representative",
        "summary": "Identifies and engages potential clients, demonstrating product value to achieve sales targets. Builds and maintains strong client relationships."
    },
    {
        "title": "Financial Analyst",
        "summary": "Evaluates financial data and trends to provide insights for investment decisions. Prepares financial reports and forecasts."
    },
    {
        "title": "Customer Support Specialist",
        "summary": "Provides assistance and support to customers, resolving inquiries and issues efficiently. Strives to improve customer satisfaction."
    },
    {
        "title": "Web Developer",
        "summary": "Creates and maintains websites, ensuring optimal performance and user experience. Collaborates with designers and content creators."
    },
    {
        "title": "Business Analyst",
        "summary": "Analyzes business needs and identifies solutions to improve processes and systems. Works with stakeholders to define project requirements."
    },
    {
        "title": "Quality Assurance Engineer",
        "summary": "Develops and executes test plans to ensure product quality. Identifies bugs and works with development teams to resolve issues."
    },
    {
        "title": "Systems Analyst",
        "summary": "Evaluates and improves IT systems. Collaborates with stakeholders to gather requirements and create technical specifications."
    },
    {
        "title": "Content Writer",
        "summary": "Creates engaging and informative content for websites and blogs. Researches topics and optimizes content for search engines."
    },
    {
        "title": "Database Administrator",
        "summary": "Manages and maintains databases, ensuring data integrity and security. Optimizes database performance and supports user access."
    },
    {
        "title": "Human Resources Manager",
        "summary": "Oversees HR functions, including recruitment, employee relations, and compliance. Develops policies to foster a positive workplace culture."
    },
    {
        "title": "Graphic Designer",
        "summary": "Creates visual concepts and designs for marketing materials, branding, and websites. Works with clients to deliver creative solutions."
    },
    {
        "title": "Operations Manager",
        "summary": "Oversees daily operations and ensures efficient processes within the organization. Analyzes performance metrics and implements improvements."
    },
    {
        "title": "SEO Specialist",
        "summary": "Implements and manages SEO strategies to improve website rankings. Analyzes performance data and conducts keyword research."
    },
    {
        "title": "Research Scientist",
        "summary": "Conducts experiments and analyzes data to advance scientific knowledge. Publishes findings in peer-reviewed journals and presents at conferences."
    },
    {
        "title": "Cloud Engineer",
        "summary": "Designs and manages cloud infrastructure. Implements cloud services and ensures system reliability and security."
    },
    {
        "title": "Compliance Officer",
        "summary": "Ensures that the organization complies with regulatory requirements. Develops policies and conducts audits to mitigate risks."
    },
    {
        "title": "E-commerce Manager",
        "summary": "Oversees online sales strategies and manages the e-commerce platform. Analyzes customer behavior and optimizes the shopping experience."
    },
    {
        "title": "Social Media Manager",
        "summary": "Develops and implements social media strategies to enhance brand presence. Engages with followers and analyzes performance metrics."
    },
    {
        "title": "Technical Writer",
        "summary": "Creates documentation for software products, including user manuals and API references. Works closely with developers to understand the product."
    },
    {
        "title": "Interior Designer",
        "summary": "Plans and designs interior spaces to meet clients' needs. Works with contractors and vendors to bring design concepts to life."
    },
    {
        "title": "Legal Assistant",
        "summary": "Provides administrative support to lawyers, including preparing documents and conducting legal research. Maintains case files and client communication."
    },
    {
        "title": "Logistics Coordinator",
        "summary": "Manages the supply chain and oversees the transportation of goods. Coordinates with suppliers, vendors, and shipping companies."
    },
    {
        "title": "Pharmaceutical Sales Representative",
        "summary": "Promotes and sells pharmaceutical products to healthcare professionals. Builds and maintains relationships with doctors and pharmacists."
    },
    {
        "title": "Web Analytics Specialist",
        "summary": "Analyzes website traffic and user behavior to improve digital marketing efforts. Utilizes tools like Google Analytics to gather insights."
    },
    {
        "title": "Video Editor",
        "summary": "Edits video content for various media platforms, ensuring high-quality output. Works with directors and producers to meet project goals."
    }
]

const summarizeJob = (inputTitle) => {
    let closestTitle = '';
    let closestTitleIndex = 0;
    
    let minDistance = 5;
  
    // Find the closest job title
    for (let index = 0; index < jobTitles.length; index++) {
        currentTitle = jobTitles[index]["title"]
        const distance = levenshteinDistance(inputTitle.toLowerCase(), currentTitle.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestTitle = currentTitle;
            closestTitleIndex = index
        }
    }
    // Return the summary or a not found message
    return closestTitle ? jobTitles[closestTitleIndex]['summary'] : 'Job title not found.';
};
// Update the value of the summary depending on the designation("job title") value
designationElem.addEventListener('keyup', () => {
    summaryElem.value = summarizeJob(designationElem.value)
});
*/
// print CV
function printCV() {
  window.print();
}

/*
document.getElementById("exportPDF").onclick = async function() {
    console.log("print button clicked")
    const { jsPDF } = window.jspdf; // Accessing jsPDF from the window object
    const element = document.getElementById("preview-sc");
    try {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; 
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 50;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("download.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
*/

let summary_btn = document.getElementById("summary-btn")
// connection with falcon API
summary_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  user_data = getUserInputs();
  let projects = user_data["projects"][0]["proj_title"];
  let achievments = user_data["achievements"][0]["achieve_title"];
  let skills = user_data["skills"][0]["skill"];
  let school = user_data["educations"][0]["edu_school"];
  let degree = user_data["educations"][0]["edu_degree"];
  let experience = user_data["experiences"][0]["exp_title"];
  const input_text = `Iam a ${designationElem.value}, skilled at ${skills}, I have achieved ${achievments}, and got a ${degree} from ${school}, ${experience}, I have done these projects: ${projects}.`;
  console.log(`user input is: ${input_text}`);
  console.log("**************************");
  
  let apiToken = "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"; // Replace with your token
  const response = await fetch(
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: "make a job summary for this: " + input_text,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.log(`Error: ${errorText}`);
    return;
  }

  const result = await response.json();
  let splitted_response = result[0]["generated_text"].split("\n");

  console.log(splitted_response[1]);
  output = result[0]["generated_text"];
  summaryElem.value = JSON.stringify(splitted_response[1], null, 2);
  
});


