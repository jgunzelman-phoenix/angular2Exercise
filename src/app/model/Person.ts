
export class Person{
    public id : String;
    public lastName: String;
    public firstName: String;
    public dob: Number;
    public hairColor: String; 
    public heightInInches: Number;

    /**
     * Updates oldP to the values of newP sans the id
     * @param oldP 
     * @param newP 
     */
    public static update(oldP : Person, newP : Person){
        oldP.dob = newP.dob;
        oldP.firstName = newP.firstName;
        oldP.hairColor = newP.hairColor;
        oldP.heightInInches = newP.heightInInches;
        oldP.lastName = newP.lastName;
    }
}