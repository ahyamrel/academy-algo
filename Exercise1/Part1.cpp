/* Magishim: 208584383 מוריאל בורודקן
			 315850461 יובל אחתרזאד   */

#include <iostream>

using namespace std;

int* BigCross1(int** matrix, int sideLen);

#define SIDELEN 15

int main()
{
	// Initialize matrix
	int** matrix = new int* [SIDELEN];
	for (int i = 0; i < SIDELEN; ++i)
	{
		matrix[i] = new int[SIDELEN];
	}

	// Initialize random array
	for (int row = 0; row < SIDELEN; row++)
	{
		for (int col = 0; col < SIDELEN; col++)
		{
			matrix[row][col] = rand() % 2;
		}
	}

	int* results = BigCross1(matrix, SIDELEN);
	cout << "Cross length: " << results[0] << endl;
	cout << "Cross row: " << results[1] << endl;
	cout << "Cross column: " << results[2] << endl;
}

//* Part 1
//	O(m^3)=O(n^(1.5)) 
//*/
int* BigCross1(int** matrix, int sideLen)
{
	bool bCrossGood = true;
	int crossMidRow = 0;
	int crossMidCol = 0;
	int crossLen = 0;
	int maxCrossLen = 0;

	for (int row = 1; row < sideLen - 1; row++)
	{
		for (int col = 1; col < sideLen - 1; col++)
		{
			if (matrix[row][col] == 1)
			{
				while (bCrossGood)
				{
					crossLen++;

					// Check if we don't overflow
					if (!(row - crossLen == -1 || row + crossLen == sideLen || col - crossLen == -1 || col + crossLen == sideLen))
					{

						// Check if any side has 0 on it, if it does the cross ends 
						if (matrix[row - crossLen][col] == 0 || matrix[row + crossLen][col] == 0 || matrix[row][col + crossLen] == 0 || matrix[row][col - crossLen] == 0)
						{
							bCrossGood = false;
						}
					}
					else
					{
						bCrossGood = false;
					}

				}

				// times 2 because it's double sided and add 1 because the middle doesn't count in the crossLen
				if (maxCrossLen < (crossLen - 1) * 2 + 1)
				{
					maxCrossLen = (crossLen - 1) * 2 + 1;
					crossMidRow = row;
					crossMidCol = col;
				}

				// Reset flag and crossLen
				bCrossGood = true;
				crossLen = 0;
			}
			
			cout << matrix[row][col] << " ";
		}

		cout << endl;
	}

	int* results = new int[3];
	results[0] = maxCrossLen;
	results[1] = crossMidRow;
	results[2] = crossMidCol;
	return results;
}
// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
