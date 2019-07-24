import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
declare const $: any;

@Injectable()
export class AlertService {


  showAlert(message: string, type: string) {
    switch (type) {
      case 'login-success':
        swal({
          title: "Login Successful!",
          text: "Welcome" + ' ' + message,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop)
        break;
      case 'success':
        swal('', message, 'success');
        break;
      case 'error': swal('', message, 'error');
        break;
      case 'info': swal('', message, 'info');
        break;
    }
  }

  conditionMessage(title: string, message: string, type: string) {
    //   swal({
    //     title: title,
    //     text: message,
    //     buttonsStyling: false,
    //     confirmButtonClass: "btn btn-success",
    //     type: "success"
    // }).catch(swal.noop)

    switch (type) {
      case 'success':
        swal({
          title: title,
          text: message,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop)
        break;
      case 'error': swal(title, message, 'error');
        break;
      case 'info': swal('', message, 'info');
        break;
    }
  }
  actionAlert(message: string, title: string, type: string) {
    switch (type) {
      case 'success':
        swal({
          title: title,
          text: message,
          buttonsStyling: false,
          timer: 1000,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop);
        break;
      case 'error':
        swal({
          title: title,
          text: message,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "error"
        }).catch(swal.noop)
    }

  }

  deleteConfirm() {
    return new Promise((resolve, reject) => {
      let value;
      swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        value = 'confirm';
        resolve(value);
        // this.showAlert();
      }, function (dismiss) {
        if (dismiss == 'cancel') {
          value = 'cancle';
          resolve(value);
          // this.showAlert();
        }
      })
    });
  }

  saveConfirm() {
    return new Promise((resolve, reject) => {
      let value;
      swal({
        title: 'Are you sure?',
        text: 'Make Sure All Field Are Correct',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        //   cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Create it!',
        //  cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        //   cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        value = 'confirm';
        resolve(value);
      }
        // , function (dismiss) {
        //   if (dismiss == 'cancel') {
        //     value = 'cancle';
        //     resolve(value)
        //   }            
        // }
      )
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      let value;
      swal({
      }).then(function () {
        // value = 'confirm';
        resolve(value);
      },
      )
    });
  }

  uploadCoverPhoto() {
    return new Promise((resolve, reject) => {
      let value;
      swal({
        title: 'Are you sure?',
        text: 'Make Sure Photo is correct Size',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        timer: 2000,
        confirmButtonText: 'Yes, Upload Photo',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        value = 'confirm';
        resolve(value);
      }, function (dismiss) {
        if (dismiss == 'cancel') {
          value = 'cancle';
          resolve(value)
        }
      })
    });
  }




  showNotification(from: any, align: any, message) {
    // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const type = ['success'];


    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: 'notifications',
      message: message,
    }, {
        type: type[color],
        timer: 500,
        placement: {
          from: from,
          align: align
        },
      });
  }

  showLoginNotification(from: any, align: any, message) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: 'notifications',
      message: message,
    }, {
        type: type[color],
        timer: 100,
        placement: {
          from: from,
          align: align
        },
      });
  }
}