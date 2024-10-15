export const concernSectionReducer = (state, action) => {
  const finalArray = [];

  const dataFunctions = {
    virgie_task_vital: function (parentObj, dataValue) {
      return dataValue.map((item) => ({
        perspective: parentObj,
        type: "virgie_task_vital",
        subType: item.box_label,
        value: item.reason,
        date: item.created_at,
        id: item.virgie_task_id,
      }));
    },
  };

  for (let objKey in action) {
    for (let innerObj in action[objKey]) {
      // Check if the key exists in dataFunctions before calling it
      if (dataFunctions.hasOwnProperty(innerObj)) {
        const returnValue = dataFunctions[innerObj](
          objKey,
          action[objKey][innerObj]
        );
        console.log("returnValue", returnValue);
        finalArray.push(...returnValue);
      } else {
        console.error(`Function not found for key: ${innerObj}`);
      }
    }
  }

  console.log("finalArray", finalArray);
  // return finalArray;
  return finalArray;
};

//   switch (action.type) {
//     case "SET_HORIZON_CONCERN": {
//       const horizonConcernData = action;
//       const newState = { ...state };

//       Object.keys(horizonConcernData).forEach((key) => {
//         console.log("Top-level key:", key);

//         if (key in newState) {
//           newState[key] = horizonConcernData[key];
//         } else {
//           newState[key] = horizonConcernData[key];
//         }

//         const childData = newState[key];
//         Object.keys(childData).forEach((childKey) => {
//           console.log("Child key:", childKey);

//           switch (childKey) {
//             case "virgie_task_vital":
//               if (Array.isArray(childData[childKey])) {
//                 childData[childKey].forEach((item) => {
//                   const boxLabel = item.box_label;
//                   const reason = item.reason;

//                   console.log("Box Label:", boxLabel);
//                   console.log("Reason:", reason);
//                 });
//               }
//               break;

//             case "consult_notes":
//               if (Array.isArray(childData[childKey])) {
//                 childData[childKey].forEach((note) => {
//                   const documentProperties = note.document_properties;

//                   if (documentProperties.records) {
//                     documentProperties.records.forEach((record) => {
//                       const propertyValue = record.propertyValue;
//                       console.log("Property Value:", propertyValue);
//                     });
//                   }
//                 });
//               }
//               break;
//             case "virgie_task_imaging":
//               if (Array.isArray(childData[childKey])) {
//                 childData[childKey].forEach((report) => {
//                   const imagingTestName = report.imaging_test_name;
//                   console.log("Imaging Test Name:", imagingTestName);
//                 });
//               }
//               break;

//             default:
//               console.log("Unhandled child key:", childKey);
//               break;
//           }
//         });
//       });

//       console.log("New State after SET_HORIZON_CONCERN:", newState);
//       return newState;
//     }

//     default:
//       return state;
//   }
