import Swal from 'sweetalert2';

export async function synchronousFetch(url: string, formData: FormData,
  title: string, text: string): Promise<any> {

  try {
    // Show SweetAlert with a loading spinner and disable backdrop click
    const loadingAlert = Swal.fire({
      title: title,
      text: text,
      allowOutsideClick: false,
      showCancelButton: true, // Show cancel button
      didOpen: () => {
        // Optional: Add a rotating animation to the spinner (SweetAlert default spinner is rotating)
        Swal.showLoading();
      },
    });

    // Perform the POST request
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    // If response is not ok, throw an error
    if (!response.ok) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Your data has been uploaded faile.',
      });
    }

    // Parse the response data
    const responseData = await response.json();

    // Close the loading SweetAlert
    Swal.close();

    // Show success SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Upload Successful!',
      text: 'Your data has been uploaded successfully.',
    });

    return responseData;

  } catch (error) {
    // Close the loading SweetAlert
    Swal.close();

    // Show error SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: `There was an error uploading your data:`,
    });
  }
}
