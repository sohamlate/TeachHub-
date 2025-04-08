import React from "react";

const SubjectTaught = () => {
  const tableHeader = [
    "Sr. No.",
    "Subject Name",
    "Type",
    "Branch",
    "Students",
    "Year",
  ];

  const postGraduateData = [
    [1, "Machine Learning", "Theory & Practical", "Computer Engineering", "ME", "2022-23"],
    [2, "Machine Learning", "Theory & Practical", "Data Science Engineering", "ME", "2022-23"],
  ];

  const underGraduateData = [
    [1, "Machine Learning", "Theory & Practical", "Computer Engineering", "BE", "2020-21, 2022-23"],
    [2, "Soft Computing & Optimization Algorithms", "Theory & Practical", "Computer Engineering", "BE", "2020-21"],
    [3, "Data Mining & Data Warehousing", "Theory & Practical", "Computer Engineering", "TE", "2020-21"],
    [4, "Machine Learning & Applications", "Theory & Practical", "Information Technology", "BE", "2020-21"],
    [5, "Fundamentals of Data Analytics (Autonomous - GHRIET)", "Theory & Practical", "All", "FE", "2020-21"],
    [6, "Computer Graphics", "Theory", "AI & DS", "SE", "2021-22"],
    [7, "Data Structures & Algorithms", "Practical", "AI & DS", "SE", "2021-22"],
    [8, "Operating System", "Theory & Practical", "AI & DS", "SE", "2021-22"],
    [9, "Business Communication Skills", "Practical", "Computer Engineering, AI & DS", "SE", "2022-23, 2021-22"],
    [10, "Project Based Learning", "Practical", "AI & DS", "SE", "2021-22"],
    [11, "Machine Learning (Honors)", "Theory & Practical", "Computer Engineering", "BE", "2022-23"],
    [12, "Humanity & Social Science", "Tutorial", "Computer Engineering", "SE", "2022-23"],
    [13, "Artificial Intelligence (Honors)", "Theory", "Computer Engineering", "TE", "2022-23"],
    [14, "LP II", "Practical", "Computer Engineering", "TE", "2022-23"],
    [15, "Programming & Problem Solving (Sem 1 & Sem 2)", "Theory & Practical", "Engineering Sciences", "FE", "2023-24 (Sem 1 & Sem 2)"],
  ];

  const renderTable = (data) => (
    <div className="overflow-x-auto rounded-lg shadow-lg border">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            {tableHeader.map((head, i) => (
              <th key={i} className="px-4 py-3 text-left border-b font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2 border-b text-sm text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Subjects Taught
      </h2>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Post Graduate
        </h3>
        {renderTable(postGraduateData)}
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Under Graduate
        </h3>
        {renderTable(underGraduateData)}
      </div>
    </div>
  );
};

export default SubjectTaught;
