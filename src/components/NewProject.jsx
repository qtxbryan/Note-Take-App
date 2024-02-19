import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({handleAddProject, handleCancelProject}) {
  
  const modal = useRef();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  

  function handleSave() {

    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDueDate = dueDateRef.current.value;

    //validation later....
    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){

      // show error modal 
      modal.current.open();
      return;
    }

    handleAddProject({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDueDate,
    });

  }


  return (
    <>
    <Modal ref={modal} buttonCaption = 'Close'>
      <h2 className = "text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
      <p className = 'text-stone-600 mb-4'>Opps ... looks like you forgot to enter a value.</p>
      <p className = 'text-stone-600 mb-4'>Please make sure to provide a valid input</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950" onClick = {handleCancelProject}>
            Cancel
          </button>
        </li>
        <li>
          <button
            className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input label="Title" ref={titleRef} type = 'text'/>
        <Input label="Description" isTextArea ref={descriptionRef} />
        <Input label="Due Date" ref={dueDateRef} type = 'date'/>
      </div>
    </div>
    </>
  );
}
