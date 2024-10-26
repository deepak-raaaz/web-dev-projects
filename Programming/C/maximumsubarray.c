// C Program to find the maximum subarray sum using nested loops

#include <stdio.h>

// Function to find the sum of subarray with maximum sum
int maxSubarraySum(int arr[], int size) {
    int maxSum = arr[0];
  
    // Outer loop for starting point of subarray
    for (int i = 0; i < size; i++) {
        int currSum = 0;
      
        // Inner loop for ending point of subarray
        for (int j = i; j < size; j++) {
            currSum = currSum + arr[j];
          
            // Update maxSum if currSum is greater than maxSum
            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
    }
    return maxSum;
}

int main() {
    int arr[] = {2, 3, -8, 7, -1, 2, 3};
    int size = sizeof(arr) / sizeof(arr[0]);
    printf("%d", maxSubarraySum(arr, size));
    return 0;
}
