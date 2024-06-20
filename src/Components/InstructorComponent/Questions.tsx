import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddQuestion from "./AddQuestion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question } from "../../Interface/interfaces";
import { MdDelete } from "react-icons/md";

import instructorAPI from "../../API/instructor";

const Questions: React.FC = () => {
    const { courseId } = useParams();
    
    const [questions, setQuestions] = useState<Question[]>([]);
 
    useEffect(() => {
      instructorAPI.fetchQuestion(courseId as string).then((res) => {
        setQuestions(res.questions);
      });
    }, [courseId]);

    const delete_question = (questionId: string) => {
        instructorAPI.deleteQuestion(courseId as string, questionId).then(() => {
          setQuestions((prevState) => 
            prevState.filter(question => question._id !== questionId)
          );
        });
    }
    
    return (
        <div className="p-4  bg-white">
            <div className="p-4 h-screen">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="flex items-center justify-center rounded bg-base-100 h-28 dark:bg-gray-800">
                        <FontAwesomeIcon className="text-2xl text-white" icon={faPlusCircle} />
                        <p className="font-bold ml-2 text-white">Add Question</p>
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Question</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions && questions?.map((ques: Question) => (
                                <tr key={ques._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ques.question}
                                    </th>
                                    <td className="px-6 py-4">
                                        <button onClick={() => delete_question(ques._id as string)} className="btn bg-base-100">
                                            <MdDelete className="text-white" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddQuestion setQuestion={setQuestions} courseId={courseId as string} />
        </div>
    );
};

export default Questions;
