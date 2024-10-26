public class Main {

  public static void main(String[] args) {

    int num = 29;
    boolean flag = false;

    // 0 and 1 are not prime numbers
    if (num == 0 || num == 1) {
        flag = true;
    }

    for (int i = 2; i <= num / 2; ++i) {

      // condition for nonprime number
      if (num % i == 0) {
        flag = true;
        break;
      }
    }

    if (!flag)
      System.out.println(num + " is a prime number.");
    else
      System.out.println(num + " is not a prime number.");
  }
}
