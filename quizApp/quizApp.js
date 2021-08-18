import id from '@salesforce/user/Id';
import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selected={}; //for storing the selected answers
    correctAnswer=0; //to show the umber of correct answers 
    isSubmitted = false;
// for disabling submit button util all the qestion are slected
    get allNotSelected(){
        return !(Object.keys(this.selected).length===(this.myQuestions).length)
    }
// list of all the question available in the component along with their correct answers
    myQuestions = [
        {
            id:"Question1",
            question:"Which of the following is not a template loop ?",
            answers:{
                a:"for:each",
                b:"iterator",
                c:"map loop"
            },
            correctAnswer:"c"

        },
        {
            id:"Question2",
            question:"Which of the following is invalid in LWC component folder ?",
            answers:{
                a:".apex",
                b:".svg",
                c:".js"
            },
            correctAnswer:"a"

        },
        {
            id:"Question3",
            question:"Which of the following is not a a dirctive ?",
            answers:{
                a:"for:each",
                b:"@track",
                c:"if:false"
            },
            correctAnswer:"b"

        },
    ];
// changeHandler gets called evry time when user chages the option using radio buttpn
    changeHandler(event){
        console.log("Name is : "+event.target.name);
        console.log("Value is : "+event.target.value);
        const{name,value} = event.target;
        // const name = event.target.name;
        // const value = event.target.value;
        this.selected = {...this.selected,[name]:value};
        // this.slected = {
        //     "Question1":"a",
        //     "Question2":"b",
        //     "Question3":"c"
        // };

    }
// form submitted handler
    submitHandler(event){
        event.preventDefault();//to prevent the default refresh of the page
        let correct = this.myQuestions.filter(item=>this.selected[item.id]=== item.correctAnswer);
        this.correctAnswer = correct.length;
        this.isSubmitted = true;
        console.log("Correct Answers --> "+this.correctAnswer);

    }
// form reset handler
    resetHandler(){
        this.selected = {};
        this.correctAnswer = 0; 
        this.isSubmitted = false;    

    }
    get percent(){
        return ((this.correctAnswer)/(this.myQuestions.length))*100;
    }
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length===this.correctAnswer?
        'slds-text-color_success':'slds-text-color_error'
        }`
    }

}