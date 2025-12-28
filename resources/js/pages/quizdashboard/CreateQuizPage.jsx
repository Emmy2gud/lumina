
import QuestionForm from '../../components/quiz/QuestionForm';

const CreateQuizPage = ({sections}) => {

  return (
    <div className="min-h-screen bg-surface-secondary">

      <div className="pt-16 md:pt-0 flex">


        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Create New Quiz</h1>
              <p className="text-text-secondary">
                Create a quiz for your students to test their knowledge
              </p>
            </div>

            <div className="bg-surface-primary p-6 rounded-lg shadow-sm">
              <QuestionForm section={sections}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;










