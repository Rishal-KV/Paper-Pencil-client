function Table({ action, data }: any) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead className="text-xs  uppercase bg-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            S_no
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>

          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((data: any, index: any) => (
          <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{data.name}</td>
            <td className="px-6 py-4">{data.email}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => action(data._id)}
                type="button"
                className={`text-white ${
                  data.is_blocked ? "bg-yellow-500" : "bg-red-500"
                } font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
              >
                {!data.is_blocked ? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
