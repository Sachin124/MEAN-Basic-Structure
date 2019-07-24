import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
//allows only numbers
  public static mobilePattern:any=/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i; 
  //Allows any valid url(e.g. www.google.com, google.co.in)
  public static urlPattern:any="/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/";
 //EmailId(abc@gmail.com)
  public static emailPattern:any=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
  //Allows only characters
  public static namePattern:any="[a-zA-Z][a-zA-Z ]*";
  //Allows characters including -,#&> and space
  public static addressPattern:any="[A-Za-z0-9-,#&. ]*$"
  //allows alphanumeric with - and space
  public static zipcodePattern:any="[a-zA-Z0-9][a-zA-Z0-9- ]*"
  //allows alphanumeric and -_
  public static userIdPattern:any="[a-zA-Z0-9][a-zA-Z0-9_-]*"
    //allows alphanumeric and -_
  public static customerCodePattern:any="[a-zA-Z0-9][a-zA-Z0-9_-]*";
  public static alphanumeric:any="[a-zA-Z0-9][a-zA-Z0-9]*";
  public static numberDot:any="[0-9.]*"
  public static custName:any="[a-zA-Z0-9][a-zA-Z0-9.& ]*"
  public static description:any="[a-zA-Z()][a-zA-Z.()-?' ]*"
  public static changemodulename:any="[a-zA-Z][a-zA-Z ]*&,";
  public static prodName:any="[a-zA-Z0-9][a-zA-Z0-9& ]*"
  public static numericOnly:any="[0-9.-]*"
  public static allowAtleastOneChar: any=`[a-zA-Z0-9-!@#$%&*"(-_,.?;:'/+)][a-zA-Z0-9-!@#$%&\n*(-_,.?;:' ]*`;
  // public static allowAtleastOneChar: any="[a-zA-Z0-9-`~!@#$%^&*()_-=/-+?/><,.:;'[]][a-zA-Z0-9-`~!@#$%^&*()_-=/-+?/><,.:;'[] ]*";
  public static alphaNumericSpace="[a-zA-Z0-9][a-zA-Z0-9.' ]*";
  public static positiveNumberOnly:any="[0-9]*"
  constructor() { }

 public static ispdf(fileType)
  {
    if(fileType!='.pdf')
    {
      return false
    }
    return true
  }

public static isnewsuploadimage(fileType)
  {
    if(fileType!='.png' && fileType!='.bnp' && fileType!='.jpg' && fileType!='.bmp')
    {
      return false
    }
    return true
  }

  public static isnewsvideo(fileType)
  {
    if(fileType!='.mp4' && fileType!='.wma')
    {
      return false
    }
    return true
  }

  public static ismediafilecheck(fileType)
  {
   
    let validFileTypes= ['png','bnp','jpg','bmp','wmv','mp3','mp4','wma']
    if (validFileTypes.indexOf(fileType) >= 0) 
    {
      return true 
    }
    else
    return false
  }

  public static isValidFileForJobAidRole(fileType){
   let validFileTypes= ['.pdf','.png','.bnp','.jpg','.bmp','.wmv','.mp3','.mp4','.pptx','.xlsx']

   if (validFileTypes.indexOf(fileType) >= 0) { 
  return true 
  }
  else
  return false
  }

}
