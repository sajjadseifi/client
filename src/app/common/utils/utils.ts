export const combineDateAndTime = (date: Date, time: Date) => { 

    const combineDate = new Date(date);

    combineDate.setHours(time.getHours());
    combineDate.setMinutes(time.getMinutes());
    combineDate.setSeconds(0);
    
    return combineDate;  
};