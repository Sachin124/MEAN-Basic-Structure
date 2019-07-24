import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "../../../public service/configuration.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FAQService {
  /*********************************************************** CRUD Operation Start ***********************************************************/

  public baseUrl = ConfigurationService.baseUrl + "AdminFAQ";
  constructor(private httpClient: HttpClient) {}

  /*********************************************************** Get All Faq *******************************************************************/
  getAllFaq(faq_product_id: number,pageNo): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `/view/${faq_product_id}/${pageNo}`);
  }

  /*********************************************************** Add New Faq *******************************************************************/

  addFaq(faqData: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/add`, faqData);
  }

  /*********************************************************** Delete Selected Faq *******************************************************************/

  deleteFaq(faq_id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `/delete/` + faq_id);
  }

  /*********************************************************** Edit Selected Faq *******************************************************************/

  editFaq(faq_id: number, editedFaqData: any): Observable<any> {
    return this.httpClient.put<any>(
      this.baseUrl + `/update/` + faq_id,
      editedFaqData
    );
  }

  /*********************************************************** Edit Selected Faq *******************************************************************/

  faqFileUpload(fileData): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/faqupload`, fileData);
  }
  /* FAQ PRODUCT */

  /********************************************************* Get All Product List *************************************************************/
  getAllProductList(pageNo): Observable<any> {
    return this.httpClient.get<any>(
      ConfigurationService.baseUrl + `AdminFAQProduct/view/${pageNo}`
    );
  }

  /********************************************************* Get All Product List *************************************************************/


  getProductList():Observable<any>{
    return this.httpClient.get<any>(ConfigurationService.baseUrl + 'AdminFAQProduct/faqproductlist');
  }
  /*********************************************************** Add New Faq Product *******************************************************************/

  addProduct(faqData: any): Observable<any> {
    return this.httpClient.post<any>(
      ConfigurationService.baseUrl + `AdminFAQProduct/add`,
      faqData
    );
  }
  /*********************************************************** Add Product Photo *****************************************************************/

  photoUpload(photoData: any): Observable<any> {
    return this.httpClient.post<any>(
      ConfigurationService.baseUrl + `AdminFAQProduct/faqproductimageupload`,
      photoData
    );
  }

  /*********************************************************** Edit Selected Product Faq *******************************************************************/

  editProduct(faq_id: number, editedFaqData: any): Observable<any> {
    return this.httpClient.put<any>(
      ConfigurationService.baseUrl + `AdminFAQProduct/update/` + faq_id,
      editedFaqData
    );
  }

  /*********************************************************** Delete Product Selected Faq *******************************************************************/

  deleteProductFAQ(productFaq_id): Observable<any> {
    return this.httpClient.delete<any>(
      ConfigurationService.baseUrl + `AdminFAQProduct/delete/` + productFaq_id
    );
  }
  /*********************************************************** CRUD Operation End ***********************************************************/
}
