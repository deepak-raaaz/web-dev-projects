import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter first number:");
        double num1 = scanner.nextDouble();

        System.out.println("Enter second number:");
        double num2 = scanner.nextDouble();

        System.out.println("Enter an operator (+, -, *, /):");
        char operator = scanner.next().charAt(0);

        scanner.close();
        double output;

        switch(operator)
        {
            case '+':
                output = num1 + num2;
                break;

            case '-':
                output = num1 - num2;
                break;

            case '*':
                output = num1 * num2;
                break;

            case '/':
                if (num2 != 0) {
                    output = num1 / num2;
                } else {
                    System.out.println("Error! Dividing by zero is not allowed.");
                    return;
                }
                break;

            default:
                System.out.println("You have entered wrong operator");
                return;
        }

        System.out.println(num1+" "+operator+" "+num2+": "+output);
    }
}

