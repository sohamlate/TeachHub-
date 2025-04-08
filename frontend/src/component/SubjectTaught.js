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
    [3, "Artificial Intelligence", "Theory & Practical", "Computer Engineering", "BE", "2019-20"],
    [4, "Design and Analysis of Algorithms", "Theory", "Computer Engineering", "TE", "2021-22"],
    [5, "Data Structures and Algorithms", "Theory & Practical", "Computer Engineering", "SE", "2016-17"],
    [6, "Data Structures", "Theory & Practical", "Computer Engineering", "SE", "2015-16"],
    [7, "Computer Graphics", "Theory & Practical", "Computer Engineering", "SE", "2016-17"],
    [8, "Microprocessor", "Theory & Practical", "Computer Engineering", "TE", "2014-15"],
    [9, "Digital Electronics & Logic Design", "Theory & Practical", "Computer Engineering", "SE", "2013-14"],
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
