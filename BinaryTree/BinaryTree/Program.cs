/* מריאל בורודקין 208584383
 * יובל אחתרזאד 315850461
 * */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            BinaryTree T = new BinaryTree();
            BuildTree(T);
            double x0 = Convert.ToDouble(Console.ReadLine());
            Point nearestPoint = NearestRightPoint(T, x0);
            Console.WriteLine("X: " + nearestPoint.x + ", Y: " + nearestPoint.y);
        }

        static void BuildTree(BinaryTree T)
        {
            Random rnd = new Random();
            for (int i = 0; i < 1000; i++)
            {
                Point p = new Point();
                p.x = rnd.NextDouble() * 100;
                p.y = rnd.NextDouble() * 100;
                T.Add(p);
            }
        }

        static Point NearestRightPoint(BinaryTree T, double target)
        {
            Node currentNode = T.Root;
            Point closestPoint = new Point();
            closestPoint.x = closestPoint.y = 0;
            double closestValue = 0;
            double minDiff = double.MaxValue;

            while (currentNode != null)
            {
                double currentDiff = currentNode.Data.x - target;
                if (currentDiff < minDiff && currentDiff > 0)
                {
                    minDiff = currentDiff;
                    closestValue = currentNode.Data.x;
                    closestPoint = currentNode.Data;
                }
                if (target < currentNode.Data.x)
                {
                    currentNode = currentNode.LeftNode;
                }
                else if (target > currentNode.Data.x)
                {
                    currentNode = currentNode.RightNode;
                }
                else
                {
                    break;
                }
            }
            return closestPoint;
        }

        class Point
        {
            public double x { get; set; }
            public double y { get; set; }
        }
        class Node
        {
            public Node LeftNode { get; set; }
            public Node RightNode { get; set; }
            public Point Data { get; set; }
        }

        class BinaryTree
        {
            public Node Root { get; set; }

            public bool Add(Point p)
            {
                Node before = null, after = this.Root;

                while (after != null)
                {
                    before = after;
                    if (p.x < after.Data.x || (p.x == after.Data.x && p.y != after.Data.y))
                        after = after.LeftNode;
                    else if (p.x > after.Data.x)
                        after = after.RightNode;
                    else
                        return false;
                }

                Node newNode = new Node();
                newNode.Data = p;

                if (this.Root == null)
                    this.Root = newNode;
                else
                {
                    if (p.x < before.Data.x)
                        before.LeftNode = newNode;
                    else
                        before.RightNode = newNode;
                }

                return true;
            }

        }
    }
}
