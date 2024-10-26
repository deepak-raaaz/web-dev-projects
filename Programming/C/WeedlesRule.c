// C program to Implement Weedle's Rule
#include <math.h>
#include <stdio.h>

// A sample function f(x) = 1/(1+x^2)
float y(float x)
{
	float num = 1;
	float denom = 1.0 + x * x;

	return num / denom;
}

// Function to find the integral value
// of f(x) with step size h, with
// initial lower limit and upper limit
// a and b
float WeedleRule(float a, float b)
{
	// Find step size h
	double h = (b - a) / 6;

	// To store the final sum
	float sum = 0;

	// Find sum using Weedle's Formula
	sum = sum + (((3 * h) / 10) * (y(a)
								+ y(a + 2 * h)
								+ 5 * y(a + h)
								+ 6 * y(a + 3 * h)
								+ y(a + 4 * h)
								+ 5 * y(a + 5 * h)
								+ y(a + 6 * h)));

	// Return the final sum
	return sum;
}

// Driver Code
int main()
{
	// lower limit and upper limit
	float a = 0, b = 6;

	// Function Call
	printf("f(x) = %f", WeedleRule(a, b));
	return 0;
}
