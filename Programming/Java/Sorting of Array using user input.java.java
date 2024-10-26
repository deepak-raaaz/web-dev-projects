import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Take the size of the array as input
        System.out.print("Enter the number of elements: ");
        int n = sc.nextInt();

        // Create an array to hold the elements
        int[] arr = new int[n];

        // Input elements from the user
        System.out.println("Enter the elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        // Sort the array in ascending order
        Arrays.sort(arr);

        // Display the sorted array
        System.out.println("Sorted in Ascending Order: " + Arrays.toString(arr));

        sc.close(); // Close the scanner
    }
}
